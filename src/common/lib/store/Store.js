/*
 * @Author: wuhao 
 * @Date: 2018-11-13 10:31:46 
 * @Desc: state实例
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-30 17:21:07
 */
import libStore from "./libStore";

let state = {
  count: 0
}
let mutations = {
  addCount(state, val) {
    state.count = val
    console.log('state.count:', state.count)
  },
  minusCount(state, val) {
    state.count = val
    console.log('state.count:', state.count)
  }
}
let actions = {
  updateCount(context, val) {
    context.commit('addCount', val);
  }
}
export default new libStore({
  state,
  mutations,
  actions
})