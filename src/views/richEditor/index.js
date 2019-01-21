import Editor from '@/common/lib/editor'
export default class RichEditor{
  constructor($root){
    this.$root = $root
    this.render()
    console.log('UE',UE)
  }
  render(){
    var richEditorTmpl = require('./richEditor.art')
    this.$root.html(richEditorTmpl())
    this.$el = this.$root.children().first()
    this.editor = new Editor("editor")
  }
}