var component = function () {
  var more = {
    $el: $('#more'),
    init() {
      this.render()
    },
    render() {
      var moreTmpl = require('./more.art')
      this.$el.html(moreTmpl())
    }
  }
  return more
}
export default component