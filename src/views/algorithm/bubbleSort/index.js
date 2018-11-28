export default class BubbleSort{
  constructor($el){
    this.$el = $('#section')
    this.render()
  }
  render(){
    var tmpl = require('./bubbleSort.art')
    this.$el.html(tmpl())
  }
}