/*
 * @Author: wuhao 
 * @Date: 2018-07-06 10:53:01 
 * @Desc: webpack打包入口
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-07-06 14:41:33
 */
import "babel-polyfill";
import './css/normalize.css';

import $ from 'jquery'
import utils from '@/common/utils'

// 变量全局化
window.utils = utils;
window.jQuery = $;
window.jquery = $;
window.$ = $;
console.log('jQuery版本',jQuery.fn.jquery);