var DetailComponent = function () {
  var detail = {
    $el: $('#detail'),
    init() {
      this.render()
    },
    render() {
      var detailTmpl = require('./detail.art')
      this.$el.html(detailTmpl())
    },
    events:{
      "click   .add":   'addQuery'
    },
    addQuery(){
      window.location.href = location.hash.split('?')[0]+'?name=xiaowang'
    }
  }
  return detail
}
export default DetailComponent