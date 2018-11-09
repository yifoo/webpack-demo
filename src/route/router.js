
export default function (){
  var router = {
    init() {
      window.addEventListener('load', this.refresh.bind(this), false);
      window.addEventListener('hashchange', this.refresh.bind(this), false);
    },
    /**路由配置 */
    routes: {
      '/index': 'views/index/index.js',
      '/news': 'views/news/news.js',
      '/news/detail': 'views/news/detail/detail.js',
      '/news/detail/more': 'views/news/detail/more/more.js',
    },
    /**
     * 路由刷新执行
     * @param {object} e 
     */
    refresh(e) {
      if(e.newURL){
        console.log('路由',e.newURL.split('#')[1],e.oldURL.split('#')[1])
      }
      // 获取当前路径,默认'/index'
      var currentURL = location.hash.slice(1).split('?')[0] || '/index';
      var list = currentURL.slice(1).split('/')
      this.url = ""
      console.log(list)
      list.forEach(item => {
        this.url += "/" + item
        this.name = this.routes[this.url]
        this.controller(this.name)
        // console.log(this.url,this.name)
      });
    },
    /**
     * 组件控制器
     * @param {string} name 
     */
    controller(name) {
      var Component = require('../' + name).default;
      // 判断是否已经配置挂载元素,默认为$('#main')
      var controller = new Component()
      if (!controller.$el) {
        controller.$el = $('#container')
      }
      // 初始化组件内容
      controller.init()
      this.bindEvents.call(controller)
    },
    /**
     * @name 绑定组件对象中events 事件
     * @desc 将组件对象中this通过call绑定
     * ! 仅支持绑定当前组件下的DOM事件
     */
    bindEvents() {
      var self = this;
      var eventName = "",
        selector = "",
        handleEvent = ""
      // 遍历events对象
      for (var index in self.events) {
        eventName = index.match(/[0-9A-Za-z]+\s/i)[0].trim(); // 匹配事件名
        selector = index.replace(/[0-9A-Za-z]+\s/i, "").trim(); // 匹配事件作用元素选择器
        handleEvent = self.events[index]; // 匹配处理事件名称
        // 运用闭包,防止事件被覆盖
        function Event(eventName, selector, handleEvent) {
          self.$el.find(selector).on(eventName, (e) => {
            // 执行事件
            self[handleEvent](e)
          })
        }
        var obj = new Event(eventName, selector, handleEvent);
        obj = null; // 用完即释放空间
      }
    },
  }
  return router
}