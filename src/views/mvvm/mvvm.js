export default class Mvvm {
  constructor($root) {
    this.$root = $root
    this.render()
    this.data={
      name:'小王',
      age:'18',
      value:0
    }
    this.newData = {}
    this.watch()
    this.events={
      "input #input" : 'handleInput'
    }
  }
  render() {
    var mvvmTmpl = require('./mvvm.art')
    this.$root.html(mvvmTmpl())
  }
  watch(){
    for(var key in this.data){
      var self = this;
      ((key)=>{
        Object.defineProperty(self.newData,key,{
          get(){
            console.log('get',self.data[key])
            return self.data[key]
          },
          set(newVal){
            console.log('set',newVal)
            self.data[key] = newVal
            if(key==='value'){
              self.$el.find('#prev').text("数据:"+newVal)
            }
          }
        })
      })(key)
    }
  }
  handleInput(e){
    this.newData.value = e.target.value
  }
}

