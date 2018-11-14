/*
 * @Author: wuhao 
 * @Date: 2018-11-13 15:52:42 
 * @Desc: 了解虚拟DOM
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-11-14 12:54:29
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

export default class VisualDom {
  constructor($el) {
    this.$el = $el
    this.render()
  }
  render() {
    var domTmpl = require('./visualDom.art')
    this.$el.html(domTmpl())
    this.visualRender()
  }
  visualRender() {
    var element = {
      tagName: 'ul', // 节点标签名
      props: { // DOM的属性，用一个对象存储键值对
        id: 'list'
      },
      children: [ // 该节点的子节点
        {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
        {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
        {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
      ]
    }
    let node = new vNode(element).render()
    this.$el.find('.mount').html(node)
  }
}