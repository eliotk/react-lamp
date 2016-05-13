var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

module.exports = {

  entry: {
    'react-lamp': './src/Lamp.js',
    'react-lamp.min': './src/Lamp.js'
  },

  externals: [
    'react',
    'react-dom'
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'dist',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'ReactLamp'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('PRODUCTION')
    }),
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
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
    ]
  }
};
