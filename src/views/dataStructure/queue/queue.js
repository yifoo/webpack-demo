export default class Queue{
  constructor($root){
    this.$root = $root.find('#section')
    $root.find("a[href='#/data/queue']").addClass("active")
    this.render()
  }
  render(){
    var queue = require('./queue.art')
    this.$root.html(queue())
    this.$el = this.$root.children().first()
  }
}