import Component from '../lib/component'
import store from '../lib/store/store'
export default class Detail extends Component{
  constructor($el) {
    super({
      store,
    })
    this.$el = $('#detail')
    this.render()
  }
  render() {
    var subStoreTmpl = require('./subStore.art')
    console.log('订阅事件长度',store.events)
    this.$el.html(subStoreTmpl())
  }
  update(){
    console.log('详情更新',store.state.count)
  }
}