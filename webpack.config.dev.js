
// import WebpackDevServer from 'webpack-dev-server'
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var config = {
  entry: [
    'babel-polyfill',
    './example/src/example.js'
  ],
  devtool: 'source-map',
  output: {
    path: __dirname,
    filename: './example/bundle/example.bundle.js'
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: './example'
    })
  ]
};

module.exports = Object.assign({}, baseConfig, config);