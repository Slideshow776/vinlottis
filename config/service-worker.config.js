"use strict";

const webpack = require("webpack");
const helpers = require("./helpers");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const ServiceWorkerConfig = {
  resolve: {
    extensions: [".js", ".vue"]
  },
  entry: {
    serviceWorker: [helpers.root("src/service-worker", "service-worker")]
  },
  optimization: {
    minimizer: []
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [helpers.root("src/service-worker", "service-worker")]
      }
    ]
  },
  mode: "production",
  output: {
    path: helpers.root("public/sw"),
    publicPath: "/",
    filename: "[name].js"
    //filename: "js/[name].bundle.js"
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: false,
        sourceMap: false
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DATE__: new Date().getTime(),
      __PUBLICKEY__: JSON.stringify(require("./defaults/push").publicKey)
    })
  ]
};

module.exports = ServiceWorkerConfig;
