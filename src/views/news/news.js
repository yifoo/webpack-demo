var NewsComponent = function(){
  var newsCom = {
    init(){
      this.render()
    },
    render(){
      var newsTmpl = require('./news.art')
      this.$el.html(newsTmpl)
    }
  }
  return newsCom
}
export default NewsComponent