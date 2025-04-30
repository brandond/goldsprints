var BundleTracker = require('webpack-bundle-tracker')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require('path');
var webpack = require('webpack');

var resolve = path.resolve.bind(path, __dirname);

module.exports = {
  devtool: 'source-map',
  entry: './assets/js/main',

  output: {
    path: resolve('assets/bundles/'),
    filename: '[name].js',
    publicPath: '/static/bundles/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },{
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },{
        test: /\.mp3$/,
        type: 'asset/resource'
      },{
        test: /\.(png|jpg)$/,
        type: 'asset/resource'
      },{
        test: /\.(css|scss|sass|less)$/,
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      },{
        test: /\.(eot|otf|svg|ttf|woff|woff2)(\?v=[0-9.]+)?$/,
        type: 'asset',
        include: [
          resolve('node_modules')
        ]
      }
    ]
  },

  plugins: [
    new BundleTracker({filename: 'webpack-stats.json', relativePath: true}),
    new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
  ]
};
