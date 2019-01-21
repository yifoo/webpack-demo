/*
 * @Author: wuhao 
 * @Date: 2019-01-09 16:51:22 
 * @Desc: 数组去重
 * @Last Modified by:   wuhao 
 * @Last Modified time: 2019-01-09 16:51:22 
 */


var arr = [10, 9, 8, 7, 6, 5, 3, 4, 2, 1, 42, 1, 3, 4, 3, 5, 7, 8, 6, 5, 6, 2, 26]
removeDuplicates1(arr)
removeDuplicates2(arr)

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