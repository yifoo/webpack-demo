# 阿斯达

```JavaScript
  // 定义一个队列构造函数
  var Queue = function () {
    var item = []
    // 添加队列顶元素
    this.enqueue = function (ele) {
      item.push(ele)
    }
    // 移除队列顶元素
    this.dequeue = function () {
      return item.shift()
    }
    // 检查队列头
    this.front = function () {
      return item[0]
    }
    // 检查队列是否为空
    this.isEmpty = function () {
      return item.length === 0
    }
    // 清除队列
    this.clear = function () {
      item = []
    }
    // 获取队列的大小
    this.size = function () {
      return item.length
    }
    // 获取数据
    this.getItems = function () {
      return item
    }
  }
  var q = new Queue()
  q.enqueue(1)
  q.enqueue(2)
  q.enqueue(3)
  console.log('q', q.getItems())  //q (3) [1, 2, 3]
  console.log('front', q.front()) //front 1
```
