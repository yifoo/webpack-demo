/*
 * @Author: wuhao 
 * @Date: 2018-07-06 10:54:49 
 * @Desc: 公共方法库
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-07-06 13:59:17
 */
export default  {
  /**
   * @name 获得cookie
   * @param {name} 参数名称
   */
  getCookie :function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  /**
   * @name 设置cookie
   * @param {name} 参数名称
   * @param {value} 参数值
   * @param {exdays} 过期时间,单位(天)
   */
  setCookie:function(name,value,exdays){
    var Days=exdays;
    var exp=new Date();
    exp.setTime(exp.getTime()+Days*24*60*60*1000);
    document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();
  },
  /**
   * @name 删除cookie
   * @param {name} 参数名称
   */
  delCookie:function(name){
    document.cookie = name+"=;expires=" + "-1";
  },
  clearCookie:function(){ 
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) {
      for (var i = keys.length; i--;){
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
      }
    } 
  },
}