/*
 * @Author: wuhao 
 * @Date: 2018-11-27 23:22:34 
 * @Desc: 订阅状态变化
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-09 14:48:36
 */
import Store from './Store'
export default class StateChange {
  constructor(props = {}) {
    this.update = this.update || function () { };
    if (props.store instanceof Store) {
      // 状态改变就触发页面重新渲染
      setTimeout(()=>{
        props.store.events.subscribe('stateChange', () => this.update());
        this.index = props.store.events.events.stateChange.length-1
        props.store.components.push({index:this.index,$el:this.$el})
      },0)
    }
  }
}