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
        DEFAULT_AXIS_COLOR: {
            X: "red",
            Y: "blue",
        },
        DEFAULT_BACKGROUND_COLOR: "#DCDCDC",
        DEFAULT_GRID_STATUS: true,
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
        shape.container = this;
        this.shapes.push(shape);
    };

    var NmplotShape = function (shape, dim) {
        this.points = [];
        this.pos = {
            x: 0,
            y: 0,
        };
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
    NmplotShape.prototype.moveTo = function (x, y, reRender = true) {
        this.pos.x = x;
        this.pos.y = y;
        if (reRender) {
            this.container.canvas.render();
        }
    };

    var NmplotCanvas = function (canvasId, container) {
        this.name = "NmplotCanvas";
        this.description = "Object to render Nmplot container on canvas";
        this.backgroundColor = Nmplot.DEFAULT_BACKGROUND_COLOR;
        this.isGridActive = Nmplot.DEFAULT_GRID_STATUS;
        this.axisColor = {
            x: Nmplot.DEFAULT_AXIS_COLOR.X,
            y: Nmplot.DEFAULT_AXIS_COLOR.Y,
        };

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.nmplotContainer = container;
        container.canvas = this;
        this.setCanvasDims(
            Nmplot.DEFAULT_CANVAS_DIMS.WIDTH,
            Nmplot.DEFAULT_CANVAS_DIMS.HEIGHT
        );
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.resetOrigin(false);
        this.render();
    };
    global.NmplotCanvas = NmplotCanvas;
    NmplotCanvas.prototype.renderBackground = function () {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    NmplotCanvas.prototype.renderGrid = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.axisColor.x;
        this.ctx.moveTo(0, this.centerY);
        this.ctx.lineTo(this.canvas.width, this.centerY);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.axisColor.y;
        this.ctx.moveTo(this.centerX, 0);
        this.ctx.lineTo(this.centerX, this.canvas.height);
        this.ctx.stroke();
    };
    NmplotCanvas.prototype.render = function () {
        this.renderBackground();
        this.renderGrid();
        var shapes = this.nmplotContainer.shapes;

        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            this.ctx.fillStyle = shape.defaultColor;
            var points = shape.points;
            this.ctx.beginPath();
            for (var j = 0; j < points.length; j++) {
                if (j === 0) {
                    this.ctx.moveTo(
                        this.originX +
                            shape.scaleX *
                                (shape.pos.x + points[j].x - shape.origin.x),
                        this.originY +
                            shape.scaleY *
                                (-1 * shape.pos.y +
                                    points[j].y -
                                    shape.origin.y)
                    );
                } else {
                    this.ctx.lineTo(
                        this.originX +
                            shape.scaleX *
                                (shape.pos.x + points[j].x - shape.origin.x),
                        this.originY +
                            shape.scaleY *
                                (-1 * shape.pos.y +
                                    points[j].y -
                                    shape.origin.y)
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
