const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlwebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./base')
const root = path.resolve(__dirname, '../')

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    new HtmlwebpackPlugin({
      title: 'HAYO小站',
      template: path.join(root, 'index.ejs'),
      inject: 'body'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
})
