var NmplotContainer = function () {
    this.name = "NmplotContainer";
    this.description = "Container for all the shapes";
    this.shapes = [];
};
NmplotContainer.prototype.add = function (shape) {
    shape.container = this;
    this.shapes.push(shape);
};
module.exports.NmplotContainer = NmplotContainer;
