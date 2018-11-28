export default class threeAdapt{
  constructor($el){
    this.$el = $('#section')
    this.render()
  }
  render(){
    var tmpl = require('./three-adapt.art')
    this.$el.html(tmpl())
  }
}