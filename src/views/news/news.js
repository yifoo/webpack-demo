  export default class News {
    constructor($el){
      this.$el = $el
    }
    init(){
      this.render()
    }
    render(){
      var newsTmpl = require('./news.art')
      this.$el.html(newsTmpl)
    }
  }