/*
 * @Author: wuhao 
 * @Date: 2018-11-13 13:56:42 
 * @Desc: 主要展示组件内事件绑定逻辑
 * @Last Modified by: wuhao
 * @Last Modified time: 2018-12-25 09:27:13
 */
import XLSX from 'xlsx'
export default class Index {
  constructor($root) {
    this.$root = $root
    this.render()
    this.events = {
      "click #btn": "exportSpecialExcel"
    }
  }
  render() {
    var toExcelTmpl = require('./toExcel.art')
    this.$root.html(toExcelTmpl)
  }
  export () {
    //要导出的json数据
    var jsonData = [{
        name: '路人甲',
        phone: '123456789',
        email: '000@123456.com'
      },
      {
        name: '炮灰乙',
        phone: '123456789',
        email: '000@123456.com'
      },
      {
        name: '土匪丙',
        phone: '123456789',
        email: '000@123456.com'
      },
      {
        name: '流氓丁',
        phone: '123456789',
        email: '000@123456.com'
      },
    ]
    //列标题，逗号隔开，每一个逗号就是隔开一个单元格
    let str = `姓名,电话,邮箱\n`;
    //增加\t为了不让表格显示科学计数法或者其他格式
    for (let i = 0; i < jsonData.length; i++) {
      for (let item in jsonData[i]) {
        str += `${jsonData[i][item] + '\t'},`;
      }
      str += '\n';
    }
    var tmpl = require("./excelTmpl.art")
    console.log(str)
    var div = $("<div></div>")
    div.html(tmpl())
    console.log(div)
    var text = div.html();
    var xlsContent= `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="ProgId" content="Excel.Sheet" /> 
</head>
<body>${text}</body>
</html>`;
        var blob = new Blob([xlsContent], { type: "application/vnd.ms-excel" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
    // //encodeURIComponent解决中文乱码
    // let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    // //通过创建a标签实现
    // var link = document.createElement("a");
    // link.href = uri;
    //对下载的文件命名
    link.download = "demo.xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
  sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    });
    // 字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  }
  transformData(data){
    var newData = [['序号', '分公司', '总人数', '渠道', '渠道人数']]
    var merge = [{s: {r: 0,c: 0},e: {r: 0,c: 0}}]
    data.forEach((item,index) => {
      newData.push([(index+1),item.comName,(item.agCount+item.bkCount+item.f1Count),'F1',item.f1Count])
      newData.push([null,null,null,'个险',item.agCount])
      newData.push([null,null,null,'银保',item.bkCount])
      merge.push({s: {r: 1+index*3,c: 0},e: {r: 3+index*3,c: 0}})
    });
    return {newData,merge}; 
  }
  exportSpecialExcel() {
    var data = [{
      "agCount": "5",
      "bkCount": "15",
      "comName": "北京分公司",
      "f1Count": "10"
    }, {
      "agCount": "5",
      "bkCount": "15",
      "comName": "上海分公司",
      "f1Count": "10"
    }, {
      "agCount": "5",
      "bkCount": "15",
      "comName": "湖北分公司",
      "f1Count": "10"
    }]
    // var aoa = [
    //   ['序号', '分公司', '总人数', '渠道', '渠道人数'],
    //   ['1', '北京', '6', 'F1', '2'],
    //   [null, null, null, '个险', '2'],
    //   [null, null, null, '银保', '2'],
    // ];
    var tran = this.transformData(data)
    var sheet = XLSX.utils.aoa_to_sheet(tran.newData);
    console.log(tran.merge)
    sheet['!merges'] = tran.merge
    this.openDownloadDialog(this.sheet2blob(sheet), '单元格合并示例.xlsx');
  }
  /**
   * 通用的打开下载对话框方法，没有测试过具体兼容性
   * @param url 下载地址，也可以是一个blob对象，必选
   * @param saveName 保存文件名，可选
   */
  openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
  }
}