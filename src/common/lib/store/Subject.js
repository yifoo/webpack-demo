class Subject {
  constructor() {
    this.eventList = []
  }
  /**
   * 订阅主题
   * @param {string} name 事件名称
   * @param {function} fn 事件方法
   */
  subscribe(name, fn) {
    if (!this.eventList.hasOwnProperty(name)) {
      this.eventList[name] = []
    }
    this.eventList[name].push(fn)
    console.log('this.eventList: ', this.eventList);
  }
  /**
   * 取消订阅主题
   * @param {string} name 事件名称
   * @param {function} fn 事件方法
   */
  unsubscribe(name, fn) {
    var fns = this.eventList[name];
    if (!fns || fns.length == 0) { // 如果没有订阅该事件,直接返回
      return false
    }
    if (!fn) { // 如果传入具体函数,表示取消所有对应name的订阅
      fns.length = 0
    } else {
      for (var i = 0; i < fns.length; i++) {
        if (fn == fns[i]) {
          fns.splice(i, 1);
        }
      }
    }
  }
  /**
   * 发布主题,触发订阅事件
   */
  pulish() {
    var name = Array.prototype.shift.call(arguments)
    var fns = this.eventList[name]
    if (!fns || fns.length == 0) { // 没有订阅该事件
      return false
    }
    for (var i = 0, fn; i < fns.length; i++) {
      fn = fns[i]
      fn.apply(this, arguments)
    }
  }
}


class Observer {
  constructor(subject, name, fn) {
    this.subject = subject
    this.name = name
    this.subject.subscribe(name, fn)
  }
}

export {
  Subject,
  Observer
}