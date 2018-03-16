const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './assets/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.js'
  }
}

