/*
 * @Author: wuhao 
 * @Date: 2018-06-08 11:28:16 
 * @Desc: 生产环境
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-10 21:20:18
 */
process.env.NODE_ENV = 'prod'; // webpack配置内部环境,要注意位置 

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//代码压缩工具
const common = require('./webpack.common');
const webpack = require('webpack')
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config')
const utils = require('./utils')

module.exports = merge(common, {
  devtool: 'source-map',	//调试源码(debug)和运行基准测试(benchmark tests)很有用
  output: {
    path: config.build.assetsRoot,      //path.resolve(__dirname, '../dist')
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/lazy/[id].[chunkhash].js'),
    publicPath: './'
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",publicPath: "../../",use:'css-loader'}),
      },
      /*编译less并添加浏览器前缀*/
      /**添加publicPath: "../../"路径,解决css的背景图片路径 */
      {
        test: /\.less$/,
        exclude: /node_modules/,
        // use:[{loader:'css-loader',options:{publicPath: "../../"}},'postcss-loader','less-loader'],
        use: ExtractTextPlugin.extract({fallback: "style-loader",publicPath: "../../",use: 'css-loader!postcss-loader!less-loader'})
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use:ExtractTextPlugin.extract({fallback: "style-loader",publicPath: "../../",use: 'css-loader!postcss-loader!sass-loader'})
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("prod")
      }
    }),
    //  new UglifyJSPlugin({ //代码压缩插件
    //   sourceMap: true		//如果配置了devtool则加改选项
    // }),
    /*清理文件夹*/
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.resolve(__dirname,'../'),
        verbose:  true,
        exclude:'favicon.ico'        　　　　　　　　　　//开启在控制台输出信息
      }),
    /*单独使用link标签加载css并设置路径，相对于output配置中的publickPath*/
    new ExtractTextPlugin({
      filename: utils.assetsPath("css/[name].bundle.css"),
      fallback:'css-loader',
      allChunks: true,
    }),
    // 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
  ]
});