/*
 * @Author: wuhao 
 * @Date: 2018-07-06 10:54:49 
 * @Desc: 公共方法库
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-11-26 20:22:54
 */
export default  {
  /**
   * 获取浏览器查询字符串参数
   */
  getQueryData: function () {
    var url = window.location.href;
    var index = url.indexOf("?");
    var data = url.substring(index + 1);
    index = data.indexOf("?")
    data = data.substring(index + 1);
    var queryData = new Object();
    var strs = data.split("&");
    for (var i = 0; i < strs.length; i++) {
      queryData[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
    return queryData;
  },
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