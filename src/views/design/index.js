export default class Design{
  constructor($root){
    this.$root = $root
    this.render()
    this.events = {
      "click     .tab-link>a": "choose"
    }
  }
  render(){
    var tmpl = require('./design.art')
    this.$root.html(tmpl())
  }
  choose(e){
    var target = $(e.target)
    target.parent().parent().children().find(".active").removeClass('active');
    target.addClass('active')
  }
}