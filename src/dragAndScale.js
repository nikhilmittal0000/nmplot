var DragAndScale = function (nmplotCanvas) {
    this.name = "Drag and Scale";
    this.last_mouse = [0, 0];
    this.nmplotCanvas = nmplotCanvas;
    this.canvas = nmplotCanvas.canvas;
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
        if (ds.isMouseDown) {
            if (ds.mouseDownOnContainer == null) {
                nmplotCanvas.posX += e.pageX - rect.left - ds.last_mouse[0];
                nmplotCanvas.posY += e.pageY - rect.top - ds.last_mouse[1];
            } else {
                ds.mouseDownOnContainer.posX +=
                    e.pageX - rect.left - ds.last_mouse[0];
                ds.mouseDownOnContainer.posY +=
                    e.pageY - rect.top - ds.last_mouse[1];
            }
            nmplotCanvas.render();
        }
        ds.last_mouse[0] = e.pageX - rect.left;
        ds.last_mouse[1] = e.pageY - rect.top;
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
        for (var i = nmplotCanvas.containers.length - 1; i >= 0; i--) {
            if (
                nmplotCanvas.containers[i].isPointInside(
                    e.pageX - rect.left,
                    e.pageY - rect.top
                )
            ) {
                ds.mouseDownOnContainer = nmplotCanvas.containers[i];
                break;
            }
        }
    }
    function mouseUp(e) {
        ds.isMouseDown = false;
    }
};

module.exports.DragAndScale = DragAndScale;
