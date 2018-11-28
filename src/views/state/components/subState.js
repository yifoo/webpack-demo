import StateChange from '@/common/lib/store/StateChange'
import store from '@/common/lib/store/StoreComponent'
export default class Detail extends StateChange{
  constructor($el) {
    super({
      store,
    })
    this.$el = $('#detail')
    this.render()
    this.events={
      'click #minus': 'mutationMinus',
    }
  }
  render() {
    var subStateTmpl = require('./subState.art')
    this.$el.html(subStateTmpl())
  }
  mutationMinus(){
    var count = store.state.count;
    count-=1
    store.commit('minusCount',count)
  }
  update(){
    console.log('详情更新',store.state.count)
  }
}