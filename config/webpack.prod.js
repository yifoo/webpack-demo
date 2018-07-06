/*
 * @Author: wuhao 
 * @Date: 2018-06-08 11:28:16 
 * @Desc: 生产环境
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-07-06 14:44:00
 */
process.env.NODE_ENV = 'prod'; // webpack配置内部环境,要注意位置 

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//代码压缩工具
const common = require('./webpack.common');
const webpack = require('webpack')
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./config')
const utils = require('./utils')

module.exports = merge(common, {
  devtool: config.build.devtool,	//调试源码(debug)和运行基准测试(benchmark tests)很有用
  output: {
    path: config.build.assetsRoot,      //path.resolve(__dirname, '../dist')
    filename: utils.assetsPath('js/[name].bundle.js'),
    chunkFilename: utils.assetsPath('js/[id].bundle.js'),
    publicPath:config.build.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("prod")
      }
    }),
     new UglifyJSPlugin({ //代码压缩插件
      sourceMap: true		//如果配置了devtool则加改选项
    }),
    /*清理文件夹*/
    new CleanWebpackPlugin(
      ['dist/*'],
      {
        root: path.resolve(__dirname,'../'),
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
      })
  ]
});