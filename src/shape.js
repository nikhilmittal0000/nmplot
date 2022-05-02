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
module.exports.NmplotShape = NmplotShape;
