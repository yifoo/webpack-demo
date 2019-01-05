export default class Vetically{
  constructor($root){
    this.$root = $root.find('#section')
    $root.find("a[href='#/layout/vetically']").addClass("active")
    this.render()
  }
  render(){
    var tmpl = require('./vetically.art')
    this.$root.html(tmpl())
  }
}