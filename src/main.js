/*
 * @Author: wuhao 
 * @Date: 2018-07-06 10:53:01 
 * @Desc: webpack打包入口
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-11-08 23:44:23
 */
import "babel-polyfill";
import './assets/css/normalize.css';

import $ from 'jquery'
import utils from '@/common/utils'
import router from '@/route/router'
// 变量全局化
window.utils = utils;
window.jQuery = $;
window.jquery = $;
window.$ = $;
router.init()
// 可根据环境配置变量,如接口api
if(process.env.NODE_ENV === 'dev') {
  console.log('%c开发环境','color:red')
}else{
  console.log('%c生产环境','color:orange')
}
console.log('%cjQuery版本','color:green',jQuery.fn.jquery);