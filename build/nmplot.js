/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/***/ ((module) => {

//const { DragAndScale } = require("./dragAndScale");

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
    // this.ds = new DragAndScale(this);
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

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.axisColor.y;
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
    if (container.selected) {
        this.ctx.shadowColor = "#d53";
        this.ctx.shadowBlur = 20;
    } else {
        this.ctx.shadowBlur = 1;
    }
    this.ctx.strokeRect(
        this.posX + container.posX - container.width / 2,
        this.posY + container.posY - container.height / 2,
        container.width,
        container.height
    );
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


/***/ }),

/***/ "./src/container.js":
/*!**************************!*\
  !*** ./src/container.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Nmplot } = __webpack_require__(/*! ./nmplot */ "./src/nmplot.js");

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


/***/ }),

/***/ "./src/nmplot.js":
/*!***********************!*\
  !*** ./src/nmplot.js ***!
  \***********************/
/***/ ((module) => {

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


/***/ }),

/***/ "./src/shape.js":
/*!**********************!*\
  !*** ./src/shape.js ***!
  \**********************/
/***/ ((module) => {

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
NmplotShape.prototype.moveTo = function (x, y, reRender) {
    this.pos.x = x;
    this.pos.y = y;
    if (reRender || reRender == null) {
        this.container.canvas.render();
    }
};
module.exports.NmplotShape = NmplotShape;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
(function (global) {
    var { Nmplot } = __webpack_require__(/*! ./nmplot.js */ "./src/nmplot.js");
    var { NmplotContainer } = __webpack_require__(/*! ./container.js */ "./src/container.js");
    var { NmplotShape } = __webpack_require__(/*! ./shape.js */ "./src/shape.js");
    var { NmplotCanvas } = __webpack_require__(/*! ./canvas.js */ "./src/canvas.js");

    global.Nmplot = Nmplot;
    global.NmplotContainer = NmplotContainer;
    global.NmplotShape = NmplotShape;
    global.NmplotCanvas = NmplotCanvas;
})(window);

})();

/******/ })()
;
//# sourceMappingURL=nmplot.js.map