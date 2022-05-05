const { Nmplot } = require("./nmplot");

var NmplotContainer = function () {
    this.name = "NmplotContainer";
    this.description = "Container for all the shapes";
    this.shapes = [];
    this.width = Nmplot.DEFAULT_CONTAINER_DIMS.X;
    this.height = Nmplot.DEFAULT_CONTAINER_DIMS.Y;
    this.posX = Nmplot.DEFAULT_CONTAINER_POS.X;
    this.posY = Nmplot.DEFAULT_CONTAINER_POS.Y;
    this.selected = false;
    this.borderVisible = true;
};
NmplotContainer.prototype.add = function (shape) {
    shape.container = this;
    this.shapes.push(shape);
};
NmplotContainer.prototype.isPointInside = function (x, y, margin) {
    var isInsideX =
        x > this.canvas.posX + this.posX - this.width / 2 - margin &&
        x < this.canvas.posX + this.posX + this.width / 2 + margin;
    var isInsideY =
        y > this.canvas.posY + this.posY - this.height / 2 - margin &&
        y < this.canvas.posY + this.posY + this.height / 2 + margin;
    return isInsideX && isInsideY;
};

NmplotContainer.prototype.moveTo = function (x, y, reRender) {
    this.posX = x;
    this.posY = y;
    if (reRender || reRender == null) {
        this.canvas.render();
    }
};
NmplotContainer.prototype.getBoundedPoint = function (x, y) {
    if (x > this.canvas.posX + this.posX + this.width / 2) {
        x = this.canvas.posX + this.posX + this.width / 2;
    } else if (x < this.canvas.posX + this.posX - this.width / 2) {
        x = this.canvas.posX + this.posX - this.width / 2;
    }
    if (y > this.canvas.posY + this.posY + this.height / 2) {
        y = this.canvas.posY + this.posY + this.height / 2;
    } else if (y < this.canvas.posY + this.posY - this.height / 2) {
        y = this.canvas.posY + this.posY - this.height / 2;
    }
    return [x, y];
};
NmplotContainer.prototype.pointOnSECorner = function (x, y) {
    if (
        x < this.canvas.posX + this.posX + this.width / 2 + 5 &&
        x > this.canvas.posX + this.posX + this.width / 2 - 5 &&
        y > this.canvas.posY + this.posY + this.height / 2 - 5 &&
        y < this.canvas.posY + this.posY + this.height / 2 + 5
    ) {
        return true;
    }
    return false;
};
NmplotContainer.prototype.hideBorder = function (reRender) {
    this.borderVisible = false;
    if (reRender || reRender == null) {
        this.canvas.render();
    }
};
NmplotContainer.prototype.showBorder = function (reRender) {
    this.borderVisible = true;
    if (reRender || reRender == null) {
        this.canvas.render();
    }
};
module.exports.NmplotContainer = NmplotContainer;
