// 主题，接收状态变化，触发每个观察者
class Subject {
  constructor() {
    this.eventList = [];
    this.loginState = false
  }
  // 获取登录状态
  getState() {
    return this.loginState
  }
  // 设置登录状态,并触发相关订阅事件
  setState(state, data) {
    this.loginState = state
    if (state) {
      this.trigger('loginSuc', data)
    }
  }
  // 事件缓存
  listen(key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  }
  // 事件触发
  trigger() {
    var key = Array.prototype.shift.call(arguments)
    var fns = this.eventList[key]
    if (!fns || fns.length == 0) { // 没有订阅该事件
      return false
    }
    for (var i = 0, fn; i < fns.length; i++) {
      fn = fns[i]
      fn.apply(this, arguments)
    }
  }
}

// 观察者，等待被触发
class Observer {
  constructor(subject, key, fn) {
    this.key = key
    this.subject = subject
    subject.listen(key, fn)
    subject.listen(key, this.update.bind(this))
  }
  update() {
    console.log(`${this.key} 更新, 登录状态: ${this.subject.getState()}`)
  }
}
export {
  Subject,
  Observer
}

