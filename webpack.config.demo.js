/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.config.base');

module.exports = merge(
  baseConfig,
  {
    devtool: 'inline-source-map',
    entry: [
      './public/index.js',
    ],
    mode: 'development',
    output: {
      filename: './bundle.js',
      path: path.join(__dirname, 'public'),
    },
  },
);
