const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: path.join( __dirname, "public")
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join( __dirname, "public"),
    compress: true,
    port: 1330,
    watchContentBase: true
  }
};
