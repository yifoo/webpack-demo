export default class Vetically{
  constructor($root){
    this.$root = $root.find('#section')
    this.render()
  }
  render(){
    var tmpl = require('./vetically.art')
    this.$root.html(tmpl())
  }
}