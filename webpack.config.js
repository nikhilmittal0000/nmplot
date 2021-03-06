const path = require("path");

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "nmplot.js",
        path: path.resolve(__dirname, "build"),
        sourceMapFilename: "nmplot.js.map",
    },
    devtool: "source-map",
    mode: "development",
};
