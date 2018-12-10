import StateChange from '@/common/lib/store/StateChange'
import store from '@/common/lib/store/StoreComponent'
export default class Detail extends StateChange{
  constructor($root) {
    super({
      store,
    })
    // 改变挂载点
    this.$root = $('#detail')
    this.render()
    this.events={
      'click #minus': 'mutationMinus',
    }
  }
  render() {
    var subStateTmpl = require('./subState.art')
    this.$root.html(subStateTmpl({
      count: store.state.count
    }))
  }
  mutationMinus(){
    var count = store.state.count;
    count-=1
    store.commit('minusCount',count)
  }
  update(){
    console.log('详情更新',this.$el.find("#count2").length)
    this.$el.find("#count2").text(store.state.count)
  }
}