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
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8000,
    publicPath: '/',
    watchContentBase: true
  },
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
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({ browsers: ['last 2 versions', 'android 4', 'ios 6'] }),
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
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/[name].css'),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

