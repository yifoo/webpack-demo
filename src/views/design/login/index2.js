import {
  timingSafeEqual
} from 'crypto';

// 主题，接收状态变化，触发每个观察者
class LoginSubject {
  constructor() {
    this.eventList = []
  }
  listen(key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  }
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


export default class LoginSubscribe {
  constructor($root) {
    this.$root = $root.find("#section")
    this.render()
    // 测试代码
    this.s = new LoginSubject()
    this.updateAddress()
    this.updateAvatar()
    this.updateUser()
    this.events = {
      "click    #login": 'login',
    }
  }
  render() {
    var loginTmpl = require('./login.art')
    this.$root.html(loginTmpl())
  }
  updateAddress() {
    var _self = this
    this.s.listen('loginSuc', function (data) {
      _self.$el.find('.address').text(data.address)
    })
  }
  updateAvatar() {
    var _self = this
    this.s.listen('loginSuc', function (data) {
      _self.$el.find('.avatar').text(data.avatar)
    })
  }
  updateUser() {
    var _self = this
    this.s.listen('loginSuc', function (data) {
      console.log('data: ', data);
      _self.$el.find('.uname').text(data.uname)
    })
  }

  login() {
    this.s.trigger('loginSuc', {
      uname: '小王',
      address: '安徽省',
      avatar: '自定义头像'
    })
  }
}