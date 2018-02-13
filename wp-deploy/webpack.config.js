const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  // context: path.resolve(__dirname, 'assets'),
  entry: {
    main: ['./assets/js/main.js', './assets/scss/main.scss']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.js',
  },
  devtool: PRODUCTION ? false : 'inline-source-map',
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
                sourceMap: !PRODUCTION
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({ browsers: ['last 2 versions', 'android 4', 'ios 6'] }),
                ],
                sourceMap: !PRODUCTION
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !PRODUCTION
              }
            },
          ]
        }),
      },
      {
        test: /bootstrap\/js\//,
        use: [
          'imports-loader?jQuery=jquery'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/[name].css'),
    ...(
      PRODUCTION ? [
        new webpack.optimize.UglifyJsPlugin()
      ] : []
    ),
  ]
}

