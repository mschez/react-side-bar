/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(
  baseConfig,
  {
    entry: ['./src/SideBar.js'],
    mode: 'production',
    optimization: {
      minimize: true,
    },
    output: {
      filename: './dist/SideBar.js',
      library: 'SideBar',
      libraryTarget: 'umd',
      path: __dirname,
      umdNamedDefine: true,
    },
  },
);
