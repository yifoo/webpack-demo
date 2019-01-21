/*
 * @Author: wuhao 
 * @Date: 2019-01-09 16:51:35 
 * @Desc: 算法
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-09 17:00:05
 */
var arr = [10, 9, 8, 7, 6, 5, 3, 4, 2, 1, 42, 1, 3, 4, 3, 5, 7, 8, 6, 5, 6, 2, 26]

function insertSort(arr) {
  console.time('insertSort耗时')
  var temp;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp
      } else {
        break;
      }
    }
  }
  console.timeEnd('insertSort耗时')
  return arr;
}
// console.log(insertSort(arr))

function advanceInsertionSort(arr) {
  console.time("高级插入")
  for (let i = 1, len = arr.length; i < len; i++) {
    let e = arr[i], //副本
      j; //保存元素e应该插入的位置
    for (j = i; j > 0; j--) {
      if (arr[j - 1] > e) {
        arr[j] = arr[j - 1];
      } else {
        break;
      }
    }
    arr[j] = e;
  }
  console.timeEnd("高级插入")
  return arr;
}
// console.log(advanceInsertionSort(arr))

function bubbleSort(arr) {
  let temp;
  console.time("普通冒泡")
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < arr[j + 1]) {
        temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  console.timeEnd("普通冒泡")
  return arr;
}
// bubbleSort(arr)

function removeDuplicates1(arr){
  console.time("hash去重")
  var arr1 = [],hash={}
  for(var i=0;i<arr.length;i++){
    if(hash[arr[i]]===undefined){
      arr1.push(arr[i])
      hash[arr[i]]=1
    }
  }
  console.timeEnd("hash去重")
  console.log(arr1)
  return arr1
}
removeDuplicates1(arr)
removeDuplicates2(arr)
function removeDuplicates2(arr){
  console.time("传统去重")
  var arr1 = [];
  for(var i=0;i<arr.length;i++){
    var status= true;
    for(var j=0;j<arr1.length;j++){
      if(arr1[j]===arr[i]){
        status = false
      }
    }
    if(status){
      arr1.push(arr[i])
    }
  }
  console.timeEnd("传统去重")
  console.log(arr1)
  return arr1
}