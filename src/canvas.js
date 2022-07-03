const { DragAndScale } = require("./dragAndScale");

var NmplotCanvas = function (canvasId) {
    this.name = "NmplotCanvas";
    this.description = "Object to render Nmplot container on canvas";
    this.backgroundColor = Nmplot.DEFAULT_BACKGROUND_COLOR;

    this.scale = 1;
    this.isGridActive = Nmplot.DEFAULT_GRID_STATUS;
    this.axisColor = {
        x: Nmplot.DEFAULT_AXIS_COLOR.X,
        y: Nmplot.DEFAULT_AXIS_COLOR.Y,
    };

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    // this.createMouseEventsHandler();
    this.ds = new DragAndScale(this);
    this.containers = [];
    // container.canvas = this;
    this.setCanvasDims(
        Nmplot.DEFAULT_CANVAS_DIMS.WIDTH,
        Nmplot.DEFAULT_CANVAS_DIMS.HEIGHT
    );
    this.resetPosition(false);
    this.render();
};
NmplotCanvas.prototype.add = function (container) {
    this.containers.push(container);
    container.canvas = this;
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
    this.ctx.moveTo(0, this.scale * this.posY);
    this.ctx.lineTo(this.canvas.width, this.scale * this.posY);
    this.ctx.stroke();

    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.axisColor.x;
    this.ctx.moveTo(this.scale * this.posX, 0);
    this.ctx.lineTo(this.scale * this.posX, this.canvas.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, 20, 0, 2 * Math.PI, false);
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
    this.renderContainerTitleBox(container);
    this.renderContainerTitle(container);
    this.renderContainerContentArea(container);
};
NmplotCanvas.prototype.renderContainerTitleBox = function (container) {
    this.ctx.lineWidth = 1;
    this.ctx.shadowBlur = 0;
    if (container.selected) {
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 1;
    }
    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "black";
    // this.ctx.beginPath();
    // this.ctx.rect(
    //     this.scale * (this.posX + container.posX - container.width / 2),
    //     this.scale * (this.posY + container.posY - container.height / 2),
    //     this.scale * container.width,
    //     this.scale * container.height
    // );
    this.ctx.beginPath();
    this.ctx.moveTo(
        this.posX + container.posX - container.width / 2,
        this.posY +
            container.posY -
            container.height / 2 +
            container.title_height
    );
    this.ctx.quadraticCurveTo(
        this.posX + container.posX - container.width / 2,
        this.posY + container.posY - container.height / 2,
        this.posX + container.posX - container.width / 2 + 10,
        this.posY + container.posY - container.height / 2
    );
    this.ctx.lineTo(
        this.posX + container.posX + container.width / 2 - 10,
        this.posY + container.posY - container.height / 2
    );
    this.ctx.quadraticCurveTo(
        this.posX + container.posX + container.width / 2,
        this.posY + container.posY - container.height / 2,
        this.posX + container.posX + container.width / 2,
        this.posY + container.posY - container.height / 2 + 20
    );
    if (container.borderVisible) {
        this.ctx.stroke();
    }

    this.ctx.fill();
    this.ctx.shadowBlur = 0;
};
NmplotCanvas.prototype.renderContainerTitle = function (container) {
    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    var txt = container.name;
    this.ctx.fillText(
        txt,
        this.posX + container.posX,
        this.posY + container.posY - container.height / 2 + 15
    );
};
NmplotCanvas.prototype.renderContainerContentArea = function (container) {
    this.ctx.lineWidth = 1;
    this.ctx.shadowBlur = 0;
    if (container.selected) {
        this.ctx.shadowColor = "#696969";
        this.ctx.shadowBlur = 5;
    }
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.beginPath();
    // this.ctx.rect(
    //     this.scale * (this.posX + container.posX - container.width / 2),
    //     this.scale * (this.posY + container.posY - container.height / 2),
    //     this.scale * container.width,
    //     this.scale * container.height
    // );
    this.ctx.beginPath();
    this.ctx.moveTo(
        this.posX + container.posX - container.width / 2,
        this.posY +
            container.posY -
            container.height / 2 +
            container.title_height
    );
    this.ctx.lineTo(
        this.posX + container.posX + container.width / 2,
        this.posY +
            container.posY -
            container.height / 2 +
            container.title_height
    );
    // this.ctx.quadraticCurveTo(
    //     this.posX + container.posX + container.width / 2,
    //     this.posY + container.posY - container.height / 2,
    //     this.posX + container.posX + container.width / 2,
    //     this.posY + container.posY - container.height / 2 + 10
    // );
    this.ctx.lineTo(
        this.posX + container.posX + container.width / 2,
        this.posY + container.posY + container.height / 2 - 10
    );
    this.ctx.quadraticCurveTo(
        this.posX + container.posX + container.width / 2,
        this.posY + container.posY + container.height / 2,
        this.posX + container.posX + container.width / 2 - 10,
        this.posY + container.posY + container.height / 2
    );
    this.ctx.lineTo(
        this.posX + container.posX - container.width / 2 + 10,
        this.posY + container.posY + container.height / 2
    );
    this.ctx.quadraticCurveTo(
        this.posX + container.posX - container.width / 2,
        this.posY + container.posY + container.height / 2,
        this.posX + container.posX - container.width / 2,
        this.posY + container.posY + container.height / 2 - 10
    );
    this.ctx.closePath();
    // this.ctx.lineTo(
    //     this.posX + container.posX - container.width / 2,
    //     this.posY + container.posY - container.height / 2 + 10
    // );
    // this.ctx.quadraticCurveTo(
    //     this.posX + container.posX - container.width / 2,
    //     this.posY + container.posY - container.height / 2,
    //     this.posX + container.posX - container.width / 2 + 10,
    //     this.posY + container.posY - container.height / 2
    // );
    if (container.borderVisible) {
        this.ctx.stroke();
    }

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
            this.ctx.moveTo(this.scale * point[0], this.scale * point[1]);
        } else {
            this.ctx.lineTo(this.scale * point[0], this.scale * point[1]);
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
