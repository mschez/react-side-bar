/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.config.base');

module.exports = merge(
  baseConfig,
  {
    devServer: {
      compress: true,
      contentBase: path.join(__dirname, 'public'),
      port: 3000,
    },
    devtool: 'inline-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './public/index.js',
    ],
    mode: 'development',
    output: {
      filename: './bundle.js',
      path: path.join(__dirname, 'public'),
    },
  },
);
