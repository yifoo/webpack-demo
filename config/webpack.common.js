/*
 * @Author: wuhao 
 * @Date: 2018-06-22 13:57:02 
 * @Desc: webpack基础配置
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-07-06 14:56:47
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const config = require('./config')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
/** 路径解析 */
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {  //入口
    main: path.resolve(__dirname,'../src/main.js'),
    index:path.resolve(__dirname,'../src/js/index.js'),
    login:path.resolve(__dirname,'../src/js/login.js'),
  },
  output: { // 输出目录
    path: config.build.assetsRoot,
    filename: '[name].[hash].js',
    publicPath:config.dev.assetsPublicPath
  },
  devtool:config.dev.devtool,
  resolve: {
    alias: {
      jquery: path.resolve(__dirname,'../src/lib/jquery-3.2.1.js'),// 本地第三方插件
      '@':resolve('src'), // 路径别名
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",use:[{loader:'css-loader',options: {minimize: true}}]}),
      },
      /*编译less并添加浏览器前缀*/
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",use: 'css-loader!postcss-loader!less-loader'})
        // use: ExtractTextPlugin.extract({fallback: "style-loader",use: 'css-loader?minimize=true!postcss-loader!less-loader'}) // 配置minimize=true 可压缩css代码
      },
      /*转换es6到es5语法*/
      { test: /\.js$/, 
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: {loader: 'babel-loader'}
      },
      /**编译art模板 */
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
      {test: /\.(svg|ico|png|jpg|gif)$/i,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 2000,  // 低于该大小会编译为base64
          name: '[name].bundle.[ext]',
          outputPath: utils.assetsPath('img'),
          // publicPath:utils.assetsPath('img') // 若配置,则覆盖output的publicPath
        }
      },
      /* 若页面html模板引入HtmlWebpackPlugin插件的配置,则会与html-loader冲突,解决方法为改ejs模板,但该loader会失效 */
      {test: /\.html$/,
       exclude: /node_modules/,
　　　　loader: 'html-loader' // 处理html中img的url路径,不用配置require
　　　　}
    ]
  }, 
  plugins: [
    /**提取公共模块代码,减小打包体积 */
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:utils.assetsPath('js/common.js'),
    }),
    // /**生成全局变量 只在js模块中,html中没有全局的$函数 不推荐*/
    // new webpack.ProvidePlugin({ 
    //   $:"jquery",
    //   jQuery:"jquery"
    // }),
   /**指定模板输出 */
   new HtmlWebpackPlugin({ 
    title:'首页',
    filename: 'index.html',       //输出文件名
    template: path.resolve(__dirname,'../src/page/index.html'), // 指定编译模板
    chunksSortMode: 'manual',// chunks的顺序,类似script标签在html中的顺序
    chunks:['common','main','index'], 
  }),
  new HtmlWebpackPlugin({ 
    title:'登录',
    filename: 'login.html',
    template: path.resolve(__dirname,'../src/page/login.html'),
    chunksSortMode: 'manual',
    chunks:['common','main','login'], 
  }),
  /*单独使用link标签加载css并设置路径，相对于output配置中的publickPath*/
  new ExtractTextPlugin({
    filename: utils.assetsPath("css/[name].bundle.css"),
    fallback:'style-loader',
    allChunks: true,
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../src/static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }
  ]),
    /*热替换*/
    new webpack.HotModuleReplacementPlugin(), //HMR
    new webpack.NoEmitOnErrorsPlugin()    //编译出现错误时,确保输出资源不会包含错误
  ],
};
