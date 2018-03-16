const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: ['./assets/js/main.js', './assets/scss/main.scss']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.js'
  },
  module: {
      rules: [
          {
              test:/.js$/,
              exclude: '/node_modules/',
              use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['babel-preset-env']
                  }
              }
          },
          { test: /\.scss$/,
              use: [
              　{ loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
              ]
          }
      ]
  }
}