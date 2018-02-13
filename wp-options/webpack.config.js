const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // context: path.resolve(__dirname, 'assets'),
  entry: {
    main: ['./assets/js/main.js', './assets/scss/main.scss']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
          test:/.js$/,
          exclude: '/node_modules/',
          use: [
              'babel-loader'
          ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({ browsers: ['last 2 versions', 'android 4', 'ios 6'] }),
                ],
                sourceMap: false
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            },
          ]
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/[name].css'),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

