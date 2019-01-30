var Queue = function () {
  var item = []
  // 添加队列顶元素
  this.enqueue = function (ele) {
    item.push(ele)
  }
  // 移除栈顶元素
  this.dequeue = function () {
    return item.shift()
  }
  // 检查队列头
  this.front = function () {
    return item[0]
  }
  // 检查栈是否为空
  this.isEmpty = function () {
    return item.length === 0
  }
  // 清除栈
  this.clear = function () {
    item = []
  }
  // 获取栈的大小
  this.size = function () {
    return item.length
  }
  // 获取数据
  this.getItems = function () {
    return item
  }
}
export default class QueueComponent {
  constructor($root) {
    this.$root = $root.find('#section')
    $root.find("a[href='#/data/queue']").addClass("active")
    this.render()
    this.init()
    var markdown = require("./js.md")
    this.$el.find("#pre").html(markdown)
  }
  render() {  
    var queue = require('./queue.art')
    this.$root.html(queue())
    this.$el = this.$root.children().first()
  }
  init() {
    window.q = new Queue()
    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    console.log('q', q.getItems())
    console.log('front', q.front())

    var arr = ['a', 'b', 'c', 'd', 'e', 'f']
    console.log('最后一个被淘汰的选手 ', this.spread(arr, 3));
  }
  // 击鼓传花
  spread(arr, times) {
    var q1 = new Queue()
    for (var i = 0; i < arr.length; i++) {
      q1.enqueue(arr[i])
    }
    var out;
    while (q1.size() > 1) {
      for (var j = 0; j < times - 1; j++) {
        q1.enqueue(q1.dequeue())
      }
      out = q1.dequeue()
    }
    return q1.dequeue()
  }
}