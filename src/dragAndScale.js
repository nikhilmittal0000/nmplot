var DragAndScale = function (nmplotCanvas) {
    this.name = "Drag and Scale";
    this.last_mouse = [0, 0];
    this.nmplotCanvas = nmplotCanvas;
    this.canvas = nmplotCanvas.canvas;
    this.pointOnCorner = false;
    this.bindEvents();
};
DragAndScale.prototype.bindEvents = function () {
    this.canvas.addEventListener("mousemove", mouseMoving, false);
    this.canvas.addEventListener("click", mouseClicked, false);
    this.canvas.addEventListener("mousedown", mouseDown, false);
    this.canvas.addEventListener("mouseup", mouseUp, false);
    var rect = this.canvas.getBoundingClientRect();
    var nmplotCanvas = this.nmplotCanvas;
    var ds = this;
    function mouseMoving(e) {
        var currMousePos = [e.pageX - rect.left, e.pageY - rect.top];
        var cursorType = "auto";
        if (!ds.isMouseDown) {
            for (var i = 0; i < nmplotCanvas.containers.length; i++) {
                if (
                    nmplotCanvas.containers[i].pointOnSECorner(
                        currMousePos[0],
                        currMousePos[1]
                    )
                ) {
                    ds.pointOnCorner = true;
                    cursorType = "se-resize";
                }
            }
            ds.canvas.style.cursor = cursorType;
        }
        if (ds.isMouseDown) {
            if (ds.pointOnCorner) {
                //Resize Window
                console.log("Aaaaaa");
                ds.mouseDownOnContainer.width +=
                    currMousePos[0] - ds.last_mouse[0];
                ds.mouseDownOnContainer.posX +=
                    (currMousePos[0] - ds.last_mouse[0]) / 2;
                ds.mouseDownOnContainer.height +=
                    currMousePos[1] - ds.last_mouse[1];
                ds.mouseDownOnContainer.posY +=
                    (currMousePos[1] - ds.last_mouse[1]) / 2;
            } else if (ds.mouseDownOnContainer == null) {
                // Pan Background
                nmplotCanvas.posX += currMousePos[0] - ds.last_mouse[0];
                nmplotCanvas.posY += currMousePos[1] - ds.last_mouse[1];
            } else {
                //move container
                ds.mouseDownOnContainer.posX +=
                    currMousePos[0] - ds.last_mouse[0];
                ds.mouseDownOnContainer.posY +=
                    currMousePos[1] - ds.last_mouse[1];
            }
            nmplotCanvas.render();
        }
        ds.last_mouse[0] = currMousePos[0];
        ds.last_mouse[1] = currMousePos[1];
    }
    function mouseClicked(e) {
        for (var i = nmplotCanvas.containers.length - 1; i >= 0; i--) {
            nmplotCanvas.containers[i].selected = false;
        }
        for (var i = nmplotCanvas.containers.length - 1; i >= 0; i--) {
            if (
                nmplotCanvas.containers[i].isPointInside(
                    e.pageX - rect.left,
                    e.pageY - rect.top
                )
            ) {
                nmplotCanvas.containers[i].selected = true;
                break;
            }
        }
        nmplotCanvas.render();
    }
    function mouseDown(e) {
        ds.isMouseDown = true;
        ds.mouseDownOnContainer = null;
        var currMousePos = [e.pageX - rect.left, e.pageY - rect.top];
        for (var i = nmplotCanvas.containers.length - 1; i >= 0; i--) {
            if (
                nmplotCanvas.containers[i].isPointInside(
                    e.pageX - rect.left,
                    e.pageY - rect.top,
                    5
                )
            ) {
                ds.mouseDownOnContainer = nmplotCanvas.containers[i];
                break;
            }
        }
        var cursorType = "auto";
        ds.pointOnCorner = false;
        for (var i = 0; i < nmplotCanvas.containers.length; i++) {
            if (
                nmplotCanvas.containers[i].pointOnSECorner(
                    currMousePos[0],
                    currMousePos[1]
                )
            ) {
                ds.pointOnCorner = true;
                cursorType = "se-resize";
            }
        }
    }
    function mouseUp(e) {
        ds.isMouseDown = false;
    }
};

module.exports.DragAndScale = DragAndScale;
