export default class Mvvm {
  constructor($el) {
    this.$el = $el
    this.render()
    const data = {};
    const input = document.getElementById('input');
    Object.defineProperty(data, 'text', {
        set(value) {
        input.value = value;
        this.value = value;
      }
    });
    input.onchange= function(e) {
      data.text = e.target.value;
      document.getElementsByClassName('show')[0].innerHTML = data.value
    }
    setTimeout(()=>{
      data.text = '新值';
      console.log('input',input.value)
    },10000)
  }
  render() {
    var mvvmTmpl = require('./mvvm.art')
    this.$el.html(mvvmTmpl())
  }
}

