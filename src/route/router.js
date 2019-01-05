export default class Router {
  constructor(obj) {
    this.mode = obj.mode
    // this.mode = 'history'
    // 路由配置
    this.routes = {
      '/index': 'views/index/index',
      '/index/detail': 'views/index/detail/detail',
      '/index/detail/more': 'views/index/detail/more/more',
      '/design': 'views/design',
      '/design/subscribe': 'views/design/subscribe/index',
      '/design/proxy': 'views/design/proxy/index',
      '/state': 'views/state/stateDemo',
      '/state/sub': 'views/state/components/subState',
      '/dom': 'views/visualDom/visualDom',
      '/mvvm': 'views/mvvm/mvvm',
      '/algorithm': 'views/algorithm',
      '/algorithm/bubbleSort': 'views/algorithm/bubbleSort',
      '/layout': 'views/layout',
      '/layout/three': 'views/layout/three/ThreeAdapt',
      '/layout/vetically': 'views/layout/vetically/Vetically',
      '/toExcel': 'views/toExcel',
      '/h5live': 'views/h5live',
      '/data': 'views/dataStructure',
      '/data/stack': 'views/dataStructure/stack/stack',
      '/data/queue': 'views/dataStructure/queue/queue',
      '/error': 'views/error/error'
    }
    // 组件挂载根元素
    this.root = $('#main')
    // 导航菜单列表
    this.navList = $('.tab .nav-item')
    this.init()
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
      this.loadView(path.split('?')[0])
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
        oldURL: oldURL,
        newURL: newURL
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
    const path = state.path.split('?')[0] || null
    if (path) {
      this.loadView(path)
    }
  }
  /**
   * 加载页面
   * @param {string} currentURL 
   */
  loadView(currentURL) {
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
      // 对于嵌套路由的处理
      if (this.oldURL && this.oldURL[index]==this.currentURLlist[index]) {
        this.handleSubRouter(item,index)
      } else {
        this.controller(this.name)
      }
    });
    // 记录链接数组,后续处理子级组件
    this.oldURL = JSON.parse(JSON.stringify(this.currentURLlist))
  }
  /**
   * 处理嵌套路由
   * @param {string} item 链接list中当前项
   * @param {number} index 链接list中当前索引
   */
  handleSubRouter(item,index){
    // 新路由是旧路由的子级
    if (this.oldURL.length < this.currentURLlist.length) {
      // 相同路由部分不重新加载
      if (item !== this.oldURL[index]) {
        this.controller(this.name)
      }
    }
    // 新路由是旧路由的父级
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
    console.log('加载页面', this.url)
    // var Component = require('../' + name).default;
    // var controller = new Component($('#main'))
    // this.bindEvents.call(controller)
    // import 函数会返回一个 Promise对象
    var Component = ()=>import('../'+name);
    Component().then(resp=>{
      // resp.default.prototype.router = this.url
      this.component = new resp.default(this.root)
      this.component.$el = this.component.$el || this.component.$root.children().first()
        this.bindEvents.call(this.component)
        // history模式下 每次组件切换都绑定所有的链接进行处理
        if (this.mode === 'history') {
          $("#main").find('a[href]').unbind('click').on('click', this.handleLink.bind(this))
        }
    })
  }
  /**
   * 手动跳转路由
   * @param {string} path 
   */
  push(path){
    if(this.mode === 'hash'){
      location.hash = '#'+path
    }else{
      history.pushState({path: path}, null, path)
      // 加载相应页面
      this.loadView(path.split('?')[0])
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