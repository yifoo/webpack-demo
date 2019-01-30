/*
 * @Author: wuhao 
 * @Date: 2018-07-06 10:53:01 
 * @Desc: webpack打包入口
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-24 17:58:01
 */
import "babel-polyfill";
import '@/assets/css/normalize.css';
import '@/assets/css/base.scss';
import '@/assets/css/main.scss';
import '@/assets/css/github.less';
import '@/assets/css/catfish.css';

import $ from 'jquery'
import utils from '@/common/utils'
import Router from '@/route/router'
import hljs from 'highlight.js';
import showdown from 'showdown';
// 变量全局化
window.utils = utils;
window.jQuery = $;
window.jquery = $;
window.$ = $;
window.markdown = new showdown.Converter();
window.hljs = hljs
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