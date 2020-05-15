/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(
  baseConfig,
  {
    entry: ['./src/SideBar.js'],
    externals: {
      react: 'react',
    },
    mode: 'production',
    optimization: {
      minimize: true,
    },
    output: {
      filename: './dist/SideBar.js',
      library: 'SideBar',
      libraryTarget: 'commonjs2',
      path: __dirname,
    },
  },
);
