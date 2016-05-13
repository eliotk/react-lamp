var path = require('path');
var webpack = require('webpack');

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
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'test_spec': './tests/test_spec.js'
  },
  output: {
    path: path.resolve('tmp'),
    filename: '[name].js'
  },
  module: {
    loaders: loaders
  },
  node: {
    fs: 'empty'
  }
};
