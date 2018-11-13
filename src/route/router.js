
export default class Router {
  constructor() {
    // 路由配置
    this.routes = {
      '/index': 'views/index/index.js',
      '/news': 'views/news/news.js',
      '/news/detail': 'views/news/detail/detail.js',
      '/news/detail/more': 'views/news/detail/more/more.js',
      '/subscribe': 'views/subscribe/subscribe.js',
      '/proxy': 'views/proxy/proxy.js',
      '/store': 'views/store/storeDemo.js',
      '/store/sub': 'views/store/components/subStore.js',
      '/error':  'views/error/error.js'
    }
  }
  init() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  }
  /**
   * 路由刷新执行
   * @param {object} e 
   */
  refresh(e) {
    if (e.newURL) {
      console.log('路由', e.newURL.split('#')[1], e.oldURL.split('#')[1])
      // var newURL = e.newURL.split('#')[1].split('?')[0]
      // var oldURL = e.oldURL.split('#')[1].split('?')[0]
      // if(newURL===oldURL){
      //   return
      // }
    }
    // 获取当前路径,默认'/index'
    var currentURL = location.hash.slice(1).split('?')[0] || '/index';
    var list = currentURL.slice(1).split('/')
    this.url = ""
    this.controller[list[list.length - 1]]
    list.forEach((item, index) => {
      this.url += "/" + item
      this.name = this.routes[this.url]
      // 404页面处理
      if(!this.name){
        location.href = '#/error'
        return false
      }
      this.controller(this.name)
    });
  }
  /**
   * 组件控制器
   * @param {string} name 
   */
  controller(name) {
    var Component = require('../' + name).default;
    // 判断是否已经配置挂载元素,默认为$('#main')
    var controller = new Component($('#main'))
    this.bindEvents.call(controller)
  }
  /**
   * 绑定组件对象中events 事件
   * @desc 将组件对象中this通过call绑定
   * ! 仅支持绑定当前组件下的DOM事件
   */
  bindEvents() {
    var self = this;
    /**
     * eventType: 事件类型
     * selector: 事件作用对象
     * handleEvent: 事件执行方法
     */
    var eventType = "",
      selector = "",
      handleEvent = "";
    var Event = function (eventType, selector, handleEvent) {
      self.$el.find(selector).on(eventType, (e) => {
        // 执行事件
        self[handleEvent](e)
      })
    }
    // 遍历events对象
    for (var index in self.events) {
      eventType = index.match(/[0-9A-Za-z]+\s/i)[0].trim(); // 匹配事件名
      selector = index.replace(/[0-9A-Za-z]+\s/i, "").trim(); // 匹配事件作用元素选择器
      handleEvent = self.events[index]; // 匹配处理事件名称
      var obj = new Event(eventType, selector, handleEvent);
      obj = null; // 用完即释放空间
    }
    Event = null
  }
}