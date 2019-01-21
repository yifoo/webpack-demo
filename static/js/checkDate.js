/*
 * @Author: wuhao 
 * @Date: 2019-01-09 17:38:29 
 * @Desc: 任意传一个y,m,d,判断日期是否有效
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-09 21:25:21
 */

checkDate(2020,2,29)
function checkDate(y,m,d){
  console.time('日期有效性')
  var isRun = y%4===0
  var isM = m>0&&m<13
  var isD = false
  switch(m){
    case 2:
    if(isRun){
      isD = d>0&&d<30
    }else{
      isD = d>0&&d<29
    };break;
    case 1:;
    case 3:;
    case 5:;
    case 7:;
    case 8:;
    case 10:;
    case 12:
      isD = d>0 && d<32;
      break;
      default:
      isD = d>0 && d<31;
      break
  }
  console.timeEnd('日期有效性')
  console.log(isM&&isD? '有效':'无效')
  return isM&&isD
}
