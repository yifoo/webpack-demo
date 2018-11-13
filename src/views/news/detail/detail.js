export default class Detail {
  constructor($el) {
    this.$el = $('#detail')
    this.render()
    this.events = {
      "click   .add": 'addQuery'
    }
  }
  render() {
    var detailTmpl = require('./detail.art')
    this.$el.html(detailTmpl())
  }
  addQuery(){
    window.location.href = location.hash.split('?')[0]+'?name=xiaowang'
  }
}