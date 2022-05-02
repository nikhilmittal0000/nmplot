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
                            (-1 * shape.pos.y + points[j].y - shape.origin.y)
                );
            } else {
                this.ctx.lineTo(
                    this.originX +
                        shape.scaleX *
                            (shape.pos.x + points[j].x - shape.origin.x),
                    this.originY +
                        shape.scaleY *
                            (-1 * shape.pos.y + points[j].y - shape.origin.y)
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

module.exports.NmplotCanvas = NmplotCanvas;
