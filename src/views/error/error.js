export default class Error{
  constructor($root){
    this.$root = $root
    this.render()
  }
  render(){
    var errorTmpl = require('./error.art')
    this.$root.html(errorTmpl)
  }
}