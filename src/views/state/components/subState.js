import StateChange from '@/common/lib/store/stateChange'
import store from '@/common/lib/store/store'
export default class Detail extends StateChange{
  constructor($root) {
    super()
    // 改变挂载点
    this.$root = $('#detail')
    this.componentName = 'SubState'
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