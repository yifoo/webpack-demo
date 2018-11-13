/*
 * @Author: wuhao 
 * @Date: 2018-11-13 10:31:46 
 * @Desc: 状态管理
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-11-13 10:44:35
 */
import StoreComponent from "./storeComponent";

let state = {
  count: 0
}
let mutations = {
  addCount(state,val){
    state.count = val
  }
}
let actions = {
  updateCount(context, val) {
    context.commit('addCount', val);
  }
}
export default new StoreComponent({
  state,
  mutations,
  actions
})