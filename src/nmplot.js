(function (global) {
    var NmplotContainer = function () {
        this.name = "NmplotContainer";
        this.description = "Container for all the shapes";
        this.shapes = [];
    };
    global.NmplotContainer = NmplotContainer;
    NmplotContainer.prototype.add = function (shape) {
        this.shapes.push(shape);
    };
    function coord(x, y) {
        return {
            x,
            y,
        };
    }
    var NmplotShape = function (shape, dim) {
        this.points = [];
        this.scaleX = 10;
        this.scaleY = 10;
        this.defaultColor = "black";

        switch (shape) {
            case "rectangle":
                this.shape = "rectangle";
                this.points = [
                    coord(0, 0),
                    coord(dim.l1, 0),
                    coord(dim.l1, dim.l2),
                    coord(0, dim.l2),
                ];
                this.origin = coord(dim.l1 / 2, dim.l2 / 2);
                break;
            default:
                this.shape = shape;
        }
    };
    global.NmplotShape = NmplotShape;
    NmplotShape.prototype.addPoint = function (x, y) {
        this.points.push(coord(x, y));
    };
    var NmplotCanvas = function (canvasId, container) {
        this.name = "NmplotCanvas";
        this.description = "Object to render Nmplot container on canvas";
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.nmplotContainer = container;
        this.setCanvasDims(1000, 500);
        this.resetOrigin();
        this.render();
    };
    global.NmplotCanvas = NmplotCanvas;
    NmplotCanvas.prototype.setBackground = function () {
        // canvas = document.getElementById("mycanvas");
        // ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "#DCDCDC";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    NmplotCanvas.prototype.render = function () {
        this.setBackground();
        var shapes = this.nmplotContainer.shapes;

        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            this.ctx.fillStyle = shape.defaultColor;
            console.log(shape);
            var points = shape.points;
            this.ctx.beginPath();
            for (var j = 0; j < points.length; j++) {
                if (j === 0) {
                    this.ctx.moveTo(
                        this.originX +
                            shape.scaleX * (points[j].x - shape.origin.x),
                        this.originY +
                            shape.scaleY * (points[j].y - shape.origin.y)
                    );
                } else {
                    this.ctx.lineTo(
                        this.originX +
                            shape.scaleX * (points[j].x - shape.origin.x),
                        this.originY +
                            shape.scaleY * (points[j].y - shape.origin.y)
                    );
                }
            }
            this.ctx.fill();
        }
    };
    NmplotCanvas.prototype.resetOrigin = function () {
        this.originX = Math.floor(this.canvas.width / 2);
        this.originY = Math.floor(this.canvas.height / 2);
    };
    NmplotCanvas.prototype.setCanvasDims = function (x, y) {
        this.canvas.width = x;
        this.canvas.height = y;
    };
})(window);
