/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { DragAndScale } = __webpack_require__(/*! ./dragAndScale */ "./src/dragAndScale.js");

var NmplotCanvas = function (canvasId, container) {
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
    this.ctx.moveTo(0, this.scale * this.posY);
    this.ctx.lineTo(this.canvas.width, this.scale * this.posY);
    this.ctx.stroke();

    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.axisColor.x;
    this.ctx.moveTo(this.scale * this.posX, 0);
    this.ctx.lineTo(this.scale * this.posX, this.canvas.height);
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
    this.ctx.shadowBlur = 0;
    if (container.selected) {
        this.ctx.shadowColor = "#696969";
        this.ctx.shadowBlur = 5;
    }
    this.ctx.fillStyle = "#F7F5F2";
    this.ctx.strokeStyle = "#8D8DAA";
    this.ctx.beginPath();
    this.ctx.rect(
        this.scale * (this.posX + container.posX - container.width / 2),
        this.scale * (this.posY + container.posY - container.height / 2),
        this.scale * container.width,
        this.scale * container.height
    );
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


/***/ }),

/***/ "./src/dragAndScale.js":
/*!*****************************!*\
  !*** ./src/dragAndScale.js ***!
  \*****************************/
/***/ ((module) => {

var DragAndScale = function (nmplotCanvas) {
    this.name = "Drag and Scale";
    this.last_mouse = [0, 0];
    this.nmplotCanvas = nmplotCanvas;
    this.canvas = nmplotCanvas.canvas;
    this.pointOnCorner = false;
    this.bindEvents();
};
DragAndScale.prototype.bindEvents = function () {
    this.canvas.addEventListener("mousemove", mouseMoving, false);
    this.canvas.addEventListener("click", mouseClicked, false);
    this.canvas.addEventListener("mousedown", mouseDown, false);
    this.canvas.addEventListener("mouseup", mouseUp, false);
    var rect = this.canvas.getBoundingClientRect();
    var nmplotCanvas = this.nmplotCanvas;
    var ds = this;
    function mouseMoving(e) {
        var currMousePos = [e.pageX - rect.left, e.pageY - rect.top];
        var cursorType = "auto";
        if (!ds.isMouseDown) {
            for (var i = 0; i < nmplotCanvas.containers.length; i++) {
                if (
                    nmplotCanvas.containers[i].pointOnSECorner(
                        currMousePos[0],
                        currMousePos[1]
                    )
                ) {
                    ds.pointOnCorner = true;
                    cursorType = "se-resize";
                }
            }
            ds.canvas.style.cursor = cursorType;
        }
        if (ds.isMouseDown) {
            if (ds.pointOnCorner) {
                //Resize Window
                console.log("Aaaaaa");
                ds.mouseDownOnContainer.width +=
                    currMousePos[0] - ds.last_mouse[0];
                ds.mouseDownOnContainer.posX +=
                    (currMousePos[0] - ds.last_mouse[0]) / 2;
                ds.mouseDownOnContainer.height +=
                    currMousePos[1] - ds.last_mouse[1];
                ds.mouseDownOnContainer.posY +=
                    (currMousePos[1] - ds.last_mouse[1]) / 2;
            } else if (ds.mouseDownOnContainer == null) {
                // Pan Background
                nmplotCanvas.posX += currMousePos[0] - ds.last_mouse[0];
                nmplotCanvas.posY += currMousePos[1] - ds.last_mouse[1];
            } else {
                //move container
                ds.mouseDownOnContainer.posX +=
                    currMousePos[0] - ds.last_mouse[0];
                ds.mouseDownOnContainer.posY +=
                    currMousePos[1] - ds.last_mouse[1];
            }
            nmplotCanvas.render();
        }
        ds.last_mouse[0] = currMousePos[0];
        ds.last_mouse[1] = currMousePos[1];
    }
    function mouseClicked(e) {
        for (var i = nmplotCanvas.containers.length - 1; i >= 0; i--) {
            nmplotCanvas.containers[i].selected = false;
        }
        for (var i = nmplotCanvas.containers.length - 1; i >= 0; i--) {
            if (
                nmplotCanvas.containers[i].isPointInside(
                    e.pageX - rect.left,
                    e.pageY - rect.top
                )
            ) {
                nmplotCanvas.containers[i].selected = true;
                break;
            }
        }
        nmplotCanvas.render();
    }
    function mouseDown(e) {
        ds.isMouseDown = true;
        ds.mouseDownOnContainer = null;
        var currMousePos = [e.pageX - rect.left, e.pageY - rect.top];
        for (var i = nmplotCanvas.containers.length - 1; i >= 0; i--) {
            if (
                nmplotCanvas.containers[i].isPointInside(
                    e.pageX - rect.left,
                    e.pageY - rect.top,
                    5
                )
            ) {
                ds.mouseDownOnContainer = nmplotCanvas.containers[i];
                break;
            }
        }
        var cursorType = "auto";
        ds.pointOnCorner = false;
        for (var i = 0; i < nmplotCanvas.containers.length; i++) {
            if (
                nmplotCanvas.containers[i].pointOnSECorner(
                    currMousePos[0],
                    currMousePos[1]
                )
            ) {
                ds.pointOnCorner = true;
                cursorType = "se-resize";
            }
        }
    }
    function mouseUp(e) {
        ds.isMouseDown = false;
    }
};

module.exports.DragAndScale = DragAndScale;


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
    DEFAULT_BACKGROUND_COLOR: "#DFDFDE",
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