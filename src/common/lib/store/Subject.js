/*
 * @Author: wuhao 
 * @Date: 2018-11-27 23:21:32 
 * @Desc: 订阅主题模块
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-11-27 23:21:59
 */
export default class Subject{
  constructor(){
    this.events = {}
  }
  /**
   * 订阅
   * @param  event 
   * @param  callback 
   */
  subscribe(event,callback){
    let self = this
    // 如果没有该事件序列,就赋值空数组
    if(!self.events.hasOwnProperty(event)){
      self.events[event] = []
    }
    return self.events[event].push(callback);
  }
  /**
   * 取消订阅
   * @param  event 
   * @param  index 
   */
  unsubscribe(event,index){
    return this.events[event].splice(index,1)
  }
  /**
   * 发布
   * @param  event 
   * @param  data 
   */
  publish(event,data={}){
    // 如果没有该事件序列,直接返回
    if(!this.events.hasOwnProperty(event)){
      return []
    }
    // 遍历执行该事件序列
    return this.events[event].map(callback=>callback(data))
  }
}