// 明星
let star = {
  name: '张XX',
  age: 25,
  phone: '13910733521'
}

// 经纪人
let agent = new Proxy(star, {
  get: function (target, key) {
    if (key === 'phone') {
      // 返回经纪人自己的手机号
      return '18611112222'
    }
    if (key === 'price') {
      return 120000
    }
    return target[key]
  },
  set: function (target, key, val) {
    if (key === 'customPrice') {
      if (val < 100000) {
        // 最低 10w
        throw new Error('价格太低')
      } else {
        target[key] = val
        return true
      }
    }
  }
})

export default class ProxyMode {
  constructor($el) {
    this.$el = $el.find("#section")
    this.render()
    console.log(agent.name,agent.age,agent.phone,agent.price)

    // 自己提供报价（砍价，或者高价争抢）
    agent.customPrice = 150000
    // agent.customPrice = 90000  // 报错：价格太低
    console.log('customPrice', agent.customPrice)
  }
  render() {
    var proxyTmpl = require('./proxy.art')
    this.$el.html(proxyTmpl())
  }
}

