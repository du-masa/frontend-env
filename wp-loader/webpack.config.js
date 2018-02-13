const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: ['./assets/js/main.js', './assets/scss/main.scss']
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].bundle.js'
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
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
    ]
  }
}

