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
};
NmplotContainer.prototype.add = function (shape) {
    shape.container = this;
    this.shapes.push(shape);
};
NmplotContainer.prototype.isPointInside = function (x, y, margin) {
    // console.log(x, y);
    var isInsideX =
        x > this.posX - this.width / 2 && x < this.posX + this.width / 2;
    // console.log(isInsideX);
    var isInsideY =
        y > this.posY - this.height / 2 && y < this.posY + this.height / 2;
    // console.log(isInsideX && isInsideY);
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
module.exports.NmplotContainer = NmplotContainer;
