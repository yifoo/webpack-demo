export default class Vetically{
  constructor($el){
    this.$el = $('#section')
    this.render()
  }
  render(){
    var tmpl = require('./vetically.art')
    this.$el.html(tmpl())
  }
}