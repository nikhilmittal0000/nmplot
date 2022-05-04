const { DragAndScale } = require("./dragAndScale");

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
    // this.createMouseEventsHandler();
    this.ds = new DragAndScale(this);
    this.containers = [container];
    container.canvas = this;
    this.setCanvasDims(
        Nmplot.DEFAULT_CANVAS_DIMS.WIDTH,
        Nmplot.DEFAULT_CANVAS_DIMS.HEIGHT
    );
    this.resetPosition(false);
    this.render();
};
NmplotCanvas.prototype.renderBackground = function () {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};
NmplotCanvas.prototype.renderGrid = function () {
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.axisColor.x;
    this.ctx.moveTo(0, this.posY);
    this.ctx.lineTo(this.canvas.width, this.posY);
    this.ctx.stroke();

    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.axisColor.x;
    this.ctx.moveTo(this.posX, 0);
    this.ctx.lineTo(this.posX, this.canvas.height);
    this.ctx.stroke();
};
NmplotCanvas.prototype.render = function () {
    this.renderBackground();
    this.renderGrid();
    var containers = this.containers;
    for (var k = 0; k < containers.length; k++) {
        var container = containers[k];
        this.renderContainer(container);
        var shapes = container.shapes;
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            this.renderShape(shape);
        }
    }
};
NmplotCanvas.prototype.renderContainer = function (container) {
    this.ctx.lineWidth = 5;
    this.ctx.shadowBlur = 0;
    if (container.selected) {
        this.ctx.shadowColor = "#696969";
        this.ctx.shadowBlur = 5;
    }
    this.ctx.fillStyle = "#F7F5F2";
    this.ctx.strokeStyle = "#8D8DAA";
    this.ctx.beginPath();
    this.ctx.rect(
        this.posX + container.posX - container.width / 2,
        this.posY + container.posY - container.height / 2,
        container.width,
        container.height
    );
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
};
NmplotCanvas.prototype.renderShape = function (shape) {
    this.ctx.fillStyle = shape.defaultColor;
    var points = shape.points;
    this.ctx.beginPath();
    for (var j = 0; j < points.length; j++) {
        var point = [
            this.posX +
                container.posX +
                shape.pos.x +
                points[j].x -
                shape.origin.x,
            this.posY +
                container.posY +
                shape.pos.y +
                points[j].y -
                shape.origin.y,
        ];
        point = shape.container.getBoundedPoint(point[0], point[1]);
        if (j === 0) {
            this.ctx.moveTo(point[0], point[1]);
        } else {
            this.ctx.lineTo(point[0], point[1]);
        }
    }
    this.ctx.fill();
};
NmplotCanvas.prototype.resetPosition = function (reRender) {
    this.posX = Math.floor(this.canvas.width / 2);
    this.posY = Math.floor(this.canvas.height / 2);
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
NmplotCanvas.prototype.moveTo = function (x, y, reRender) {
    this.posX = x;
    this.posY = y;
    if (reRender || reRender == null) {
        this.render();
    }
};
module.exports.NmplotCanvas = NmplotCanvas;
