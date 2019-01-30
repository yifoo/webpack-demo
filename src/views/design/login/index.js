import {
  Subject,
  Observer
} from '@/common/lib/subject'
export default class LoginSubscribe {
  constructor($root) {
    this.$root = $root.find("#section")
    this.render()
    // 测试代码
    this.subject = new Subject()
    new Observer(this.subject, 'loginSuc', this.updateAvatar.bind(this))
    new Observer(this.subject, 'loginSuc', this.updateAddress.bind(this))
    new Observer(this.subject, 'loginSuc', this.updateUser.bind(this))
    this.events = {
      "click    #login": 'login',
    }
  }
  render() {
    var loginTmpl = require('./login.art')
    this.$root.html(loginTmpl())
  }
  updateAddress(data) {
    this.$el.find('.address').text(data.address)
  }
  updateAvatar(data) {
    this.$el.find('.avatar').text(data.avatar)
  }
  updateUser(data) {
    this.$el.find('.uname').text(data.uname)
  }
  login() {
    this.subject.setState(true, {
      uname: '小王',
      address: '安徽省',
      avatar: '自定义头像'
    })
  }
}