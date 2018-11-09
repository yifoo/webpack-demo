var IndexComponent = function () {
  var index = {
    init(){
      this.render()
    },
    render(){
      var indexTmpl = require('./index.art')
      this.$el.html(indexTmpl)
    },
    events:{
      'click  #btn1': 'trigger1',
      'click  #btn2': 'trigger2'
    },
    trigger1(){
      alert('绑定事件1成功')
    },
    trigger2(){
      alert('绑定事件2成功')
    }
  }
  return index
}
export default IndexComponent