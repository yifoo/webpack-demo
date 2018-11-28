/*
 * @Author: wuhao 
 * @Date: 2018-11-27 23:22:34 
 * @Desc: 订阅状态变化
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-11-27 23:25:03
 */
import Store from './Store'
export default class StateChange {
  constructor(props = {}) {
    this.update = this.update || function () { };
    if (props.store instanceof Store) {
      // 状态改变就触发页面重新渲染
      var hash = location.hash.split("?")[0]
      if(props.store.components.indexOf(hash) ===-1){
        props.store.events.subscribe('stateChange', () => this.update());
        props.store.components.push(hash)
      }
    }
  }
}