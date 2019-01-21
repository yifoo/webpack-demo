/*
 * @Author: wuhao 
 * @Date: 2018-07-06 10:53:01 
 * @Desc: webpack打包入口
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-16 10:49:15
 */
import "babel-polyfill";
import '@/assets/css/normalize.css';
import '@/assets/css/base.scss';
import '@/assets/css/main.scss';

import $ from 'jquery'
import utils from '@/common/utils'
import Router from '@/route/router'
// 变量全局化
window.utils = utils;
window.jQuery = $;
window.jquery = $;
window.$ = $;
let router = new Router({
  mode:'hash'
})
// 可根据环境配置变量,如接口api
if(process.env.NODE_ENV === 'dev') {
  console.log('%c开发环境','color:red')
}else{
  console.log('%c生产环境','color:orange')
}
console.log('%cjQuery版本','color:green',jQuery.fn.jquery);