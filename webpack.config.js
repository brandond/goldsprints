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
        test: /\.woff$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },{
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },{
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },{
        test: /\.(css|scss|sass|less)$/,
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      },{
        test: /\.(eot|otf|png|svg|ttf|woff|woff2)(\?v=[0-9.]+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
        include: [
          resolve('node_modules')
        ]
      }
    ]
  },

  plugins: [
    new BundleTracker({filename: 'webpack-stats.json'}),
    new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
  ]
};
