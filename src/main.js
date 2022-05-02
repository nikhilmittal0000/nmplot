(function (global) {
    var { Nmplot } = require("./nmplot.js");
    var { NmplotContainer } = require("./container.js");
    var { NmplotShape } = require("./shape.js");
    var { NmplotCanvas } = require("./canvas.js");

    global.Nmplot = Nmplot;
    global.NmplotContainer = NmplotContainer;
    global.NmplotShape = NmplotShape;
    global.NmplotCanvas = NmplotCanvas;
})(window);
