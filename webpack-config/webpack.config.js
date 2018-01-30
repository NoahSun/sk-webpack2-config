'use strict';

const helper = require('./helper');
const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, helper.root, './app/splitting_code/index.js')
  },
  context: path.resolve(__dirname, helper.root),
  output: {
    path: path.resolve(__dirname, helper.outputPath),
    filename: '[name].[hash].bundule.js',
    publicPath: '/'
  },
  module: {
    rules: []
  },
  resolve: {},
  devtool: 'source-map',
  plugins: []
};
