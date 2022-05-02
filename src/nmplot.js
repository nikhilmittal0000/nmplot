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
    DEFAULT_UNIT_SIZE: {
        X: 10,
        Y: 10,
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
module.exports.Nmplot = Nmplot;
