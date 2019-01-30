/*
 * @Author: wuhao 
 * @Date: 2018-06-08 11:27:52 
 * @Desc: 开发环境
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-30 11:11:16
 */
process.env.NODE_ENV = 'dev'; // webpack配置内部环境,要注意位置 
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');
const config = require('./config');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
console.log('路径',path.posix.join(config.dev.assetsPublicPath, 'index.html'))
module.exports = merge(common, {
  devtool: config.dev.devtool,
  devServer: {  //提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
    host: '0.0.0.0',
    port: config.dev.port,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    inline: true,
    // open:true,
    compress: true,
    quiet: true,
    hot: true, //热启动
    hotOnly:false,
    contentBase:path.resolve(__dirname, "../dist"),  //服务器的位置
    publicPath: config.dev.assetsPublicPath,  // 绝对路径
    // watchOptions: {
    //   poll: false,
    // }
    // proxy:{
    //   '/api':{
    //     target:'http://hwptest.mobile.taikang.com:8080/tkoper',
    //     changeOrigin: true,
    //     secure: false,
    //     // pathRewrite: {'^/api' : ''},
    //   }
    // }
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:["style-loader",'css-loader'],
      },
      /*编译less并添加浏览器前缀*/
      /**添加publicPath: "../../"路径,解决css的背景图片路径 */
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use:["style-loader",{loader:'css-loader',options:{publicPath: "../../"}},'postcss-loader','less-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use:["style-loader",{loader:'css-loader',options:{publicPath: "../../"}},'postcss-loader','sass-loader'],
      },
    ],
  },
  plugins:[
    new webpack.DefinePlugin({  //该配置可在js代码中识别,利于根据开发环境选择不同接口
      'process.env': {
          NODE_ENV: '"dev"'
      }
    }),
    new FriendlyErrorsWebpackPlugin({ //更好的在终端看到webapck运行的警告和错误
      compilationSuccessInfo: {
        messages: [`程序运行在: http://${config.dev.host}:${config.dev.port}`],
      },
      clearConsole: true,
    }),
    /*热替换*/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),// 显示模块路径
    new webpack.NoEmitOnErrorsPlugin(),
  ]
});