var Stack = function() {
  var item = []
  // 添加栈顶元素
  this.push=function(ele){
    item.push(ele)
  }
  // 移除栈顶元素
  this.pop=function(){
    return item.pop()
  }
  // 检查栈顶
  this.peek=function(){
    return item[item.length-1]
  }
  // 检查栈是否为空
  this.isEmpty=function(){
    return item.length===0
  }
  // 清除栈
  this.clear=function(){
    item = []
  }
  // 获取栈的大小
  this.size=function(){
    return item.length
  }
  // 获取数据
  this.getItems=function(){
    return item
  }
}
export default class StackComponent{
  constructor($root){
    this.$root = $root.find('#section')
    $root.find("a[href='#/data/stack']").addClass("active")
    this.render()
    this.init()
  }
  render(){
    var stack = require('./stack.art')
    this.$root.html(stack())
    this.$el = this.$root.children().first()
  }
  init(){
    window.list = new Stack()
    list.push(1)
    list.push(2)
    list.push(3)
    console.log('list',list.getItems())
    console.log('peek',list.peek())
  }
}