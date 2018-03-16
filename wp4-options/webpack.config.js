const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    main: ['./assets/js/main.js', './assets/scss/main.scss']
  },
  output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: '[name].bundle.js'
  },
  devtool: "inline-source-map",
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
            use: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                    minimize: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [
                      require('autoprefixer')({ browsers: ['last 2 versions'] }),
                    ],
                    sourceMap: true
                    },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                },
              ]
            }),          
          }
      ]
  },
  plugins: [
    new ExtractTextPlugin('../css/[name].css'),
    new UglifyJsPlugin()
  ]
}