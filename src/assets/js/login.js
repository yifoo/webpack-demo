/*
 * @Author: wuhao 
 * @Date: 2018-07-06 10:53:45 
 * @Desc: 登录页js
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-07-06 14:55:10
 */
import '../css/login.less';

$('#submit').on('click', (e) => { // babel将自动转为es5语法
  e.preventDefault();
  console.log('登录校验操作');
  var uname = $('#uname').val();
  var upwd = $('#upwd').val();
  if(!(uname&&upwd)){
    console.warn('要先填表单');
    return;
  }
  utils.setCookie('uname', uname, 7)
  utils.setCookie('upwd', upwd, 7)
  setTimeout(()=>{
    window.location.href = './index.html'
  },2000)
})