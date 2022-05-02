(function (global) {
    var Nmplot = {
        VERSION: 1.0,

        //SHAPE
        DEFAULT_SHAPE_SCALE: {
            X: 10,
            Y: 10,
        },

        //CANVAS
        DEFAULT_CANVAS_DIMS: {
            WIDTH: 1000,
            HEIGHT: 500,
        },
        DEFAULT_BACKGROUND_COLOR: "#DCDCDC",
        createCoord: function (x, y) {
            return {
                x,
                y,
            };
        },
    };
    global.Nmplot = Nmplot;

    var NmplotContainer = function () {
        this.name = "NmplotContainer";
        this.description = "Container for all the shapes";
        this.shapes = [];
    };
    global.NmplotContainer = NmplotContainer;
    NmplotContainer.prototype.add = function (shape) {
        this.shapes.push(shape);
    };

    var NmplotShape = function (shape, dim) {
        this.points = [];
        this.scaleX = Nmplot.DEFAULT_SHAPE_SCALE.X;
        this.scaleY = Nmplot.DEFAULT_SHAPE_SCALE.X;
        this.defaultColor = "black";

        switch (shape) {
            case "rectangle":
                this.shape = "rectangle";
                this.points = [
                    Nmplot.createCoord(0, 0),
                    Nmplot.createCoord(dim.l1, 0),
                    Nmplot.createCoord(dim.l1, dim.l2),
                    Nmplot.createCoord(0, dim.l2),
                ];
                this.origin = Nmplot.createCoord(dim.l1 / 2, dim.l2 / 2);
                break;
            default:
                this.shape = shape;
        }
    };
    global.NmplotShape = NmplotShape;
    NmplotShape.prototype.addPoint = function (x, y) {
        this.points.push(Nmplot.createCoord(x, y));
    };

    var NmplotCanvas = function (canvasId, container) {
        this.name = "NmplotCanvas";
        this.description = "Object to render Nmplot container on canvas";
        this.backgroundColor = Nmplot.DEFAULT_BACKGROUND_COLOR;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.nmplotContainer = container;
        this.setCanvasDims(
            Nmplot.DEFAULT_CANVAS_DIMS.WIDTH,
            Nmplot.DEFAULT_CANVAS_DIMS.HEIGHT
        );
        this.resetOrigin(false);
        this.render();
    };
    global.NmplotCanvas = NmplotCanvas;
    NmplotCanvas.prototype.setBackground = function () {
        // canvas = document.getElementById("mycanvas");
        // ctx = canvas.getContext("2d");
        this.ctx.fillStyle = this.backgroundColor;
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
    NmplotCanvas.prototype.resetOrigin = function (reRender) {
        this.originX = Math.floor(this.canvas.width / 2);
        this.originY = Math.floor(this.canvas.height / 2);
        if (reRender || reRender == null) {
            console.log("a");
            this.render();
        }
    };
    NmplotCanvas.prototype.setCanvasDims = function (x, y) {
        this.canvas.width = x;
        this.canvas.height = y;
    };
    NmplotCanvas.prototype.updateBackgroundColor = function (color, reRender) {
        this.backgroundColor = color;
        if (reRender || reRender == null) {
            this.render();
        }
    };
})(window);
