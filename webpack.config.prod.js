/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(
  baseConfig,
  {
    entry: ['./src/SideBar.js'],
    output: {
      filename: './dist/SideBar.js',
      library: 'SideBar',
      libraryTarget: 'umd',
      path: __dirname,
      umdNamedDefine: true,
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          pure_getters: true,
          screw_ie8: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
        exclude: [/\.min\.js$/gi],
        mangle: true,
        output: {
          comments: false,
        },
      }),
    ],
  },
);
