/*
 * @Author: wuhao 
 * @Date: 2018-11-27 23:21:32 
 * @Desc: 订阅主题模块
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-09 00:35:55
 */
export default class Subject {
  constructor() {
    this.events = {}
  }
  /**
   * 订阅
   * @param  event 
   * @param  callback 
   * @description 判断传递的event事件是否存在事件池中,如果存在,在该事件数组中追加一个新的方法
   */
  subscribe(event, callback) {
    var self = this
    // 如果没有该事件序列,就赋值空数组
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = []
    }
    return self.events[event].push(callback);
  }
  /**
   * 取消订阅 从订阅主题事件数组中移除事件
   * @param  event 
   * @param  index 
   */
  unsubscribe(event, index) {
    return this.events[event].splice(index, 1)
  }
  /**
   * 发布
   * @param  event 
   * @param  data 
   * @description 判断传递的event事件是否存在事件池中,如果存在,遍历执行该事件数组中所有方法
   */
  publish(event, data = {}) {
    // 如果没有该事件序列,直接返回
    if (!this.events.hasOwnProperty(event)) {
      return []
    }
    // 遍历执行该事件序列
    return this.events[event].map(callback => callback(data))
  }
}