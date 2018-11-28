export default class Layout{
  constructor($el){
    this.$el = $el
    this.render()
    this.events = {
      "click     .tab-link>a": "choose"
    }
  }
  render(){
    var tmpl = require('./layout.art')
    this.$el.html(tmpl())
  }
  choose(e){
    var target = $(e.target)
    target.parent().parent().children().find(".active").removeClass('active');
    target.addClass('active')
  }
}