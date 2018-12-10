/*
 * @Author: wuhao 
 * @Date: 2018-11-13 10:30:50 
 * @Desc: 状态管理
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-09 00:35:55
 */
import Subject from './Subject'
export default class Store {
  constructor(params) {
    var self = this
    this.mutations = params.mutations ? params.mutations : {}
    this.actions = params.actions ? params.actions : {}
    this.status = 'resting'
    this.events = new Subject()
    this.components = [] // 用来记录相应组件

    this.state = new Proxy((params.state || {}), {
      get(state, key) {
        return state[key]
      },
      set(state, key, val) {
        state[key] = val;
        console.log(`状态变化: ${key}: ${val}`);
        // 触发所有状态变化的方法
        self.events.publish('stateChange', self.state);
        if (self.status !== 'mutation') {
          console.warn(`需要采用mutation来改变状态值`);
        }
        self.status = 'resting';
        return true;
      }
    })
  }
  /**
   * 修改状态属性值的方法
   * @param  key 的方法属性名 
   * @param  newVal 状态的新值 
   */
  commit(key, newVal) {
    if (typeof (this.mutations[key]) != 'function') {
      return fasle
    }
    console.groupCollapsed(`MUTATION: ${key}`);
    this.status = 'mutation';
    this.mutations[key](this.state, newVal);
    console.groupEnd();
    return true;
  }
  /**
   * 分发执行mutations的方法
   * @param  key 的方法属性名 
   * @param  newVal 状态的新值 
   */
  dispatch(key, newVal) {
    if (typeof (this.actions[key]) != 'function') {
      return fasle
    }
    setTimeout(()=>{
      console.groupCollapsed(`ACTION: ${key}`);
      self.status = 'action';
      this.actions[key](this, newVal);
      console.groupEnd();
      return true
    },0)
  }
}