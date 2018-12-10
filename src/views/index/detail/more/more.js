export default class More {
  constructor($el) {
    this.$root = $('#more')
    this.render()
  }
  render() {
    var moreTmpl = require('./more.art')
      this.$root.html(moreTmpl())
  }
}