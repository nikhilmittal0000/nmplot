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

        switch (shape) {
            case "rectangle":
                this.shape = "rectangle";
                this.points = [
                    coord(0, 0),
                    coord(dim.l1, 0),
                    coord(dim.l1, dim.l2),
                    coord(0, dim.l2),
                ];
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
        const scale = 10;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.setBackground();
        var shapes = container.shapes;
        this.ctx.fillStyle = "black";
        for (var i = 0; i < shapes.length; i++) {
            console.log(shapes[i]);
            var points = shapes[i].points;
            this.ctx.beginPath();
            for (var j = 0; j < points.length; j++) {
                if (j === 0) {
                    this.ctx.moveTo(points[j].x * scale, points[j].y * scale);
                } else {
                    this.ctx.lineTo(scale * points[j].x, scale * points[j].y);
                }
            }
            this.ctx.fill();
        }
        this.name = "NmplotCanvas";
        this.description = "Utility to draw and animate shape on canvas";
    };
    global.NmplotCanvas = NmplotCanvas;
    NmplotCanvas.prototype.setBackground = function () {
        // canvas = document.getElementById("mycanvas");
        // ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "#DCDCDC";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
})(window);
