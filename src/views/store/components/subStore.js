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
    this.$el.html(subStoreTmpl())
  }
  update(){
    console.log('详情更新',store.state.count)
  }
}