
// import WebpackDevServer from 'webpack-dev-server'
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = {
  entry: [ './src/SideBar.js' ],
  output: {
    path: __dirname,
    filename: './dist/SideBar.js',
    library: 'SideBar',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()

  ]
};

module.exports = Object.assign({}, baseConfig, config);