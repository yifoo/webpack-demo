/*
 * @Author: wuhao 
 * @Date: 2018-11-13 15:52:42 
 * @Desc: 了解虚拟DOM
 * @Last Modified by:   wuhao 
 * @Last Modified time: 2018-11-13 15:52:42 
 */
/**
 * 获取节点对象
 */
class vNode {
  constructor({ tag, children, text }){
    this.tag = tag
    this.children = children
    this.text = text
  }
  render() {
    if (this.tag === '#text') {
      return document.createTextNode(this.text)
    }
    // 元素都挂载到tag下
    let el = document.createElement(this.tag)
    this.children.map((vChild) => {
      el.appendChild(new vNode(vChild).render())
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
    let nodesData = {
      tag: 'div',
      children: [
        {
          tag: 'div',
          children: [
            {
              tag: 'span',
              children: [
                {
                  tag: '#text',
                  text: 'hello'
                }
              ]
            }
          ]
        },
        {
          tag: 'span',
          children: [
            {
              tag: '#text',
              text: 'world'
            }
          ]
        }
      ]
    }
    let node = new vNode(nodesData)
    this.$el.find('.mount').html(node.render())
  }
}