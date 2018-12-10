export default class Detail {
  constructor($root) {
    this.$root = $('#detail')
    this.render()
    this.events = {
      "click   .add": 'addQuery'
    }
  }
  render() {
    var detailTmpl = require('./detail.art')
    this.$root.html(detailTmpl())
  }
  addQuery(){
    window.location.href = location.hash.split('?')[0]+'?name=xiaowang'
  }
}