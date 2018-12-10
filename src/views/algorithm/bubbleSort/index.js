export default class BubbleSort{
  constructor($root){
    this.$root = $('#section')
    this.render()
  }
  render(){
    var tmpl = require('./bubbleSort.art')
    this.$root.html(tmpl())
  }
}