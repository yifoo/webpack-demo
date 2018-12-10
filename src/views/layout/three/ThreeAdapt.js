export default class threeAdapt{
  constructor($root){
    this.$root = $root.find('#section')
    this.render()
  }
  render(){
    var tmpl = require('./three-adapt.art')
    this.$root.html(tmpl())
  }
}