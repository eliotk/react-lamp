var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
  },
  { test: /\.css$/, loader: "style-loader!css-loader" }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src/demo', 'main.js'),
  output: {
    path: path.resolve('demo'),
    filename: '[name].js',
    publicPath: '/react-lamp/demo'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/demo', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: loaders
  }
};
