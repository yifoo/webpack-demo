export default class Detail {
  constructor($el) {
    this.$el = $('#detail')
    this.events = {
      "click   .add": 'addQuery'
    }
  }
  init() {
    this.render()
  }
  render() {
    var detailTmpl = require('./detail.art')
    this.$el.html(detailTmpl())
  }
  addQuery(){
    window.location.href = location.hash.split('?')[0]+'?name=xiaowang'
  }
}