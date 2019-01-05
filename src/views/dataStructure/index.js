export default class DataStructure{
  constructor($root){
    this.$root = $root
    this.render()
    this.events = {
      "click     .tab-link>a": "choose"
    }
  }
  render(){
    var dataTmpl = require('./dataTmpl.art')
    this.$root.html(dataTmpl())
    this.$el = this.$root.children().first()
  }
  choose(e){
    var target = $(e.target)
    target.parent().parent().children().find(".active").removeClass('active');
  }
}