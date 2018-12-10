/*
 * @Author: wuhao 
 * @Date: 2018-11-13 13:56:42 
 * @Desc: 主要展示组件内事件绑定逻辑
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-08 23:29:31
 */
export default class Index{
  constructor($root){
    this.$root = $root
    this.render()
    this.events = {
      'click  #btn1': 'trigger1',
      'click  #btn2': 'trigger2'
    }
  }
  render(){
    var indexTmpl = require('./index.art')
    this.$root.html(indexTmpl)
  }
  trigger1(){
    alert('绑定事件1成功')
  }
  trigger2(){
    alert('绑定事件2成功')
  }
}