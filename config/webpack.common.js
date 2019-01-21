/*
 * @Author: wuhao 
 * @Date: 2018-06-22 13:57:02 
 * @Desc: webpack基础配置
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-07 13:18:45
 */
// require("babel-polyfill");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
/** 路径解析 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  devtool: config.dev.devtool,
  entry: {  //入口
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: { // 输出目录
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/lazy/[name].[chunkhash].js'),
    publicPath: process.env.NODE_ENV === 'test'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, '../static/lib/jquery-3.2.1.js'),// 本地第三方插件
      '@': resolve('src'), // 路径指代
      '#': resolve('dist')
    }
  },
  module: {
    rules: [
      /*转换es6到es5语法*/
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        use: { loader: 'babel-loader', }
      },
      /**编译art模板 */
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
      {
        test: /\.(svg|ico|png|jpg|gif)$/i,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 2000,
          // useRelativePath: true,
          name: utils.assetsPath('img/[name].bundle.[ext]')
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader' // 处理html中img的url路径
      },
      {
        test: /\.md$/,
        loader: ['html-loader','markdown-loader'] // 处理html中img的url路径
      }
    ]
  },
  plugins: [
    /**提取公共模块代码,减小打包体积 */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: utils.assetsPath('js/common.[hash].js'),
    }),
    /**指定模板输出 */
    new HtmlWebpackPlugin({
      title: '首页',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      chunksSortMode: 'manual',
      chunks: ['common', 'main'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ]
};
