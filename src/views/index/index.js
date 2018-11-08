export default {
  init(id){
    this.$el = $(id)
    this.render()
  },
  render(){
    var indexTmpl = require('./index.art')
    this.$el.html(indexTmpl)
  }
}