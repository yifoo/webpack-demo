/*
 * @Author: wuhao 
 * @Date: 2018-11-13 15:52:42 
 * @Desc: 了解虚拟DOM
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-08 23:34:17
 */
/**
 * 获取节点对象
 */
class vNode {
  constructor({tagName,props,children}){
    this.tagName = tagName
    this.props = props
    this.children = children
  }
  render() {
    var el = document.createElement(this.tagName)
    var props = this.props
    // 遍历节点属性并设置
    for(var propName in props){
      el.setAttribute(propName,props[propName])
    }
    var children = this.children || []
    children.forEach((child)=>{
      // 如果子节点是对象，递归构建DOM节点
      var chileEle =typeof(child)==='object'?  new vNode(child).render() : document.createTextNode(child)// 如果字符串，只构建文本节点
      el.appendChild(chileEle)
    })
    return el
  }
}
console.log(vNode.prototype,vNode.prototype.__proto__ ===Object.prototype)
export default class VisualDom {
  constructor($root) {
    this.$root = $root
    this.render()
  }
  render() {
    var domTmpl = require('./visualDom.art')
    this.$root.html(domTmpl())
    this.visualRender()
  }
  visualRender() {
    var element = {
      tagName:'div',
      children:[
        {
          tagName:'img',
          props:{
            style:'width:60%;margin:1rem 0',
            src:"https://haohome.top/18-3-11/88286547.jpg"
          }
        },
        {
          tagName: 'ul', // 节点标签名
          props: { // DOM的属性，用一个对象存储键值对
            id: 'list'
          },
          children: [ // 该节点的子节点
            {tagName: 'li', props: {class: 'item'}, children: ["构造函数具有prototype 属性，指向原型对象"]},
            {tagName: 'li', props: {class: 'item'}, children: ["原型对象具有constructor 属性，指向构造函数"]},
            {tagName: 'li', props: {class: 'item'}, children: ["实例对象具有__protot__ 属性，指向原型对象,继承原型对象的方法"]},
          ]
        },
        {
          tagName:'p',
          props:{style:'color:red'},
          children:[
            {tagName:'p',children:["Student===Student.prototype.constructor"]},
            {tagName:'p',children:["lilei.__proto__===Student.prototype"]}
          ]
        }
      ]
    }
    let node = new vNode(element).render()
    this.$root.find('.mount').html(node)
  }
}