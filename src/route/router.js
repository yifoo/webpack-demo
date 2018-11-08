var router = {
  init(){
    window.addEventListener('load',this.refresh.bind(this),false);
    window.addEventListener('hashchange',this.refresh.bind(this),false);
    this.controller()
  },
  routes:{
    '/index'       :   'views/index/index.js',
    '/news'       :   'views/news/news.js',
    '/product'    :   'views/product/product.js'
  },
  refresh(){
    this.currentURL = location.hash.slice(1).split('?')[0] || '/index';
    var name = this.routes[this.currentURL];
    var controller = require('../'+ name);
    controller.default.init('#main')
  },
  controller(){
    console.log(this)
  }
}
export default router