export default class More {
  constructor($el) {
    this.$el = $('#more')
  }
  init() {
    this.render()
  }
  render() {
    var moreTmpl = require('./more.art')
      this.$el.html(moreTmpl())
  }
}