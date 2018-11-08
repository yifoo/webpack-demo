export default {
  init(id){
    this.$el = $(id)
    this.render()
  },
  render(){
    var productTmpl = require('./product.art')
    this.$el.html(productTmpl)
  }
}