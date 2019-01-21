class Editor{
  constructor($el,options){
    var editorOpt = {
      lang: 'zh-cn', //语言
      // initialFrameHeight: height, //"source"
      toolbars: [
        ["undo", "redo", "|", "fontsize", "|", "blockquote", "strikethrough", "removeformat", "formatmatch", "emotion", "link", "unlink", "horizontal", "source"],
        ["bold", "italic", "underline", "fontborder", "superscript", "subscript", "forecolor", "backcolor", "|", "imagenone", "imageleft", "imageright", "imagecenter", "|", "insertorderedlist", "insertunorderedlist", "indent", "justifyleft", "justifycenter", "justifyright", "justifyjustify", "insertimage", "insertvideo", "music", "map"]
      ]
    }
    UE.getEditor($el,editorOpt)
  }
}
export default Editor