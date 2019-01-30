import StateChange from '@/common/lib/storage/stateChange'
import store from '@/common/lib/storage/store'
export default class StoreDemo extends StateChange {
  constructor($root) {
    super()
    this.$root = $root.find("#section")
    this.render()
    this.events = {
      "click    #store": 'test'
    }
  }
  render() {
    var storeTmpl = require('./store.art')
    this.$root.html(storeTmpl())
  }
  update(){
    console.log('测试暗示旷达科技')
  }
  test(){
    store.commit("addCount",2)
  }
}