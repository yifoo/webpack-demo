export default class Index{
  constructor($el){
    this.$el = $el
    this.render()
    this.events = {
      'click  #btn1': 'trigger1',
      'click  #btn2': 'trigger2'
    }
  }
  render(){
    var indexTmpl = require('./index.art')
    this.$el.html(indexTmpl)
  }
  trigger1(){
    alert('绑定事件1成功')
  }
  trigger2(){
    alert('绑定事件2成功')
  }
}