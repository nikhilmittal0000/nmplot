var Nmplot = {
    VERSION: 1.0,

    //SHAPE
    DEFAULT_SHAPE_SCALE: {
        X: 10,
        Y: 10,
    },

    //Container
    DEFAULT_CONTAINER_DIMS: {
        X: 200,
        Y: 300,
    },
    DEFAULT_CONTAINER_POS: {
        X: 0,
        Y: 0,
    },
    DEFAULT_CONTAINER_MIN_WIDTH: 50,
    DEFAULT_CONTAINER_MIN_HEIGHT: 50,

    //CANVAS
    DEFAULT_CANVAS_DIMS: {
        WIDTH: 1000,
        HEIGHT: 500,
    },
    DEFAULT_AXIS_COLOR: {
        X: "red",
        Y: "blue",
    },
    DEFAULT_UNIT_SIZE: 20,
    DEFAULT_BACKGROUND_COLOR: "white", //"#DFDFDE",
    DEFAULT_GRID_STATUS: true,
    createCoord: function (x, y) {
        return {
            x,
            y,
        };
    },
};
module.exports.Nmplot = Nmplot;
