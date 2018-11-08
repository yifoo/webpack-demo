export default {
  init(id){
    this.$el = $(id)
    this.render()
  },
  render(){
    var newsTmpl = require('./news.art')
    this.$el.html(newsTmpl)
  }
}