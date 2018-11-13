export default class Error{
  constructor($el){
    this.$el = $el
    this.render()
  }
  render(){
    var errorTmpl = require('./error.art')
    this.$el.html(errorTmpl)
  }
}