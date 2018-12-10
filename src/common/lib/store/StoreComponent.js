/*
 * @Author: wuhao 
 * @Date: 2018-11-13 10:31:46 
 * @Desc: state实例
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-08 14:30:30
 */
import Store from "./Store";

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
export default new Store({
  state,
  mutations,
  actions
})