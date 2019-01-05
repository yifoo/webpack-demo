export default class threeAdapt{
  constructor($root){
    this.$root = $root.find('#section')
    $root.find("a[href='#/layout/three']").addClass("active")
    this.render()
  }
  render(){
    var tmpl = require('./three-adapt.art')
    this.$root.html(tmpl())
  }
}