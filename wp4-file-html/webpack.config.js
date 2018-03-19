const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
  const PRODUCTION = argv.mode === 'production';
  return {
    entry: {
      main: ['./assets/js/main.js', './assets/scss/main.scss']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].bundle.js'
    },
    devtool: !PRODUCTION ? "inline-source-map" : false,
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
                    sourceMap: !PRODUCTION,
                    minimize: PRODUCTION,
                    url: false
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [
                      require('autoprefixer')({ browsers: ['last 2 versions'] }),
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
            test: /.(jpe?g|png|gif|svg)/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath : 'images/',
                  publicPath : '../images'
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 65
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                }
              },
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/',
                  publicPath : '../fonts'  
                }
              }
            ]
          },
        ]
    },
    plugins: [
      new ExtractTextPlugin('./css/[name].css'),
      ...(
        PRODUCTION ? [new UglifyJsPlugin()]: []
      )
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 8080,
      publicPath: '/',
      watchContentBase: true
    },
  }
};