export default class Router {
  constructor(obj) {
    this.mode = obj.mode
    this.mode = 'hash'
    // 路由配置
    this.routes = {
      '/index': 'views/index/index',
      '/index/detail': 'views/index/detail/detail',
      '/index/detail/more': 'views/index/detail/more/more',
      '/subscribe': 'views/subscribe/subscribe',
      '/proxy': 'views/proxy/proxy',
      '/state': 'views/state/stateDemo',
      '/state/sub': 'views/state/components/subState',
      '/dom': 'views/visualDom/visualDom',
      '/error': 'views/error/error'
    }
    // 导航菜单列表
    this.navList = $('.tab .nav-item')
  }
  init() {
    if (this.mode === 'hash') {
      window.addEventListener('load', this.hashRefresh.bind(this), false);
      window.addEventListener('hashchange', this.hashRefresh.bind(this), false);
    } else {
      this.bindLink()
      window.addEventListener('load', this.loadView.bind(this, location.pathname));
      window.addEventListener('popstate', this.historyRefresh.bind(this));
    }
  }
  /**
   * history模式劫持 a链接
   */
  bindLink() {
    $('#nav').on('click', 'a.nav-item', this.handleLink.bind(this))
  }
  /**
   * history 处理a链接
   * @param  e 当前对象Event
   */
  handleLink(e) {
    e.preventDefault();
    // 获取元素路径属性
    let href = $(e.target).attr('href')
    // 对非路由链接直接跳转
    if (href.slice(0, 1) !== '#') {
      window.location.href = href
    } else {
      let path = href.slice(1)
      history.pushState({
        path: path
      }, null, path)
      // 加载相应页面
      this.loadView(path)
    }
  }
  /**
   * hash路由刷新执行
   * @param {object} e 
   */
  hashRefresh(e) {
    if (e.newURL) {
      var newURL = e.newURL.split('#')[1];
      var oldURL = e.oldURL.split('#')[1];
      console.dir({
        newURL: newURL,
        oldURL: oldURL
      })
    }
    // 获取当前路径,默认'/index'
    var currentURL = location.hash.slice(1).split('?')[0] || '/index';
    this.loadView(currentURL)
  }
  /**
   * history模式刷新页面
   * @param  e  当前对象Event
   */
  historyRefresh(e) {
    const state = e.state || {}
    const path = state.path || null
    if (path) {
      this.loadView(path)
    }
  }
  /**
   * 加载页面
   * @param {string} currentURL 
   */
  loadView(currentURL) {
    console.log('currentURL', currentURL)
    if (this.mode === 'history' && currentURL === '/') {
      history.replaceState({path: '/'}, null, '/')
      currentURL = '/index'
    }
    // 多级链接拆分为数组,遍历依次加载
    this.currentURLlist = currentURL.slice(1).split('/')
    this.url = ""
    this.currentURLlist.forEach((item, index) => {
      // 导航菜单激活显示
      if (index === 0) {
        this.navActive(item)
      }
      this.url += "/" + item
      this.name = this.routes[this.url]
      // 404页面处理
      if (!this.name) {
        this.errorPage()
        return false
      }
      // 对于子级页面的处理
      if (this.oldURL && this.oldURL[0]==this.currentURLlist[0]) {
        this.handleSubRouter(item,index)
      } else {
        this.controller(this.name)
      }
    });
    // 记录链接数组,后续处理子级组件
    this.oldURL = JSON.parse(JSON.stringify(this.currentURLlist))
  }
  /**
   * 处理子级组件
   * @param {string} item 链接list中当前项
   * @param {number} index 链接list中当前索引
   */
  handleSubRouter(item,index){
    if (this.oldURL.length < this.currentURLlist.length) {
      // 相同路由部分不重新加载
      if (item !== this.oldURL[index]) {
        this.controller(this.name)
      }
    }
    if (this.oldURL.length > this.currentURLlist.length) {
      var len = Math.min(this.oldURL.length, this.currentURLlist.length)
      // 只重新加载最后一个路由
      if (index == len - 1) {
        this.controller(this.name)
      }
    }
  }
  /**
   * 404页面处理
   */
  errorPage() {
    if (this.mode === 'hash') {
      location.href = '#/error'
    } else {
      history.replaceState({path: '/error'}, null, '/error')
      this.loadView('/error')
    }
  }
  /**
   * 组件控制器
   * @param {string} name 
   */
  controller(name) {
    console.log('name', name)
    var Component = require('../' + name).default;
    // 判断是否已经配置挂载元素,默认为$('#main')
    var controller = new Component($('#main'))
    this.bindEvents.call(controller)
    // history模式下 每次组件切换都绑定所有的链接进行处理
    if (this.mode === 'history') {
      $("#main").find('a[href]').unbind('click').on('click', this.handleLink.bind(this))
    }
  }
  /**
   * 绑定组件对象中events 事件
   * @desc 将组件对象中this通过call绑定
   * ! 仅支持绑定当前组件下的DOM事件
   */
  bindEvents() {
    var self = this;
    //eventType: 事件类型;selector: 事件作用对象;handleEvent: 事件执行方法
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
  /**
   * 导航激活显示
   * @param  item 当前router对象
   */
  navActive(item) {
    for (var i = 0; i < this.navList.length; i++) {
      $(this.navList[i]).removeClass('active')
      if ($(this.navList[i]).attr('href').slice(2) === item) {
        $(this.navList[i]).addClass('active')
      }
    }
  }
}