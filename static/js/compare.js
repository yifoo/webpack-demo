/*
 * @Author: wuhao 
 * @Date: 2019-01-09 17:20:10 
 * @Desc: 三个数排序
 * @Last Modified by:   wuhao 
 * @Last Modified time: 2019-01-09 17:20:10 
 */
compare(3,7,4)
compare2(3,7,4)
compare3(3,7,4)

function compare(x,y,z){
  console.time("传统三个排序")
  var arr = []
  arr.push(x)
  arr.push(y)
  arr.push(z)
  console.log('arg: ', arr);
  for(var i=0;i<arr.length;i++){
    var temp = 0
    for(var j=i;j<arr.length;j++){
      if(arr[j]<arr[j-1]){
        temp = arr[j-1]
        arr[j-1] = arr[j]
        arr[j] = temp
      }
    }
  }
  console.log(arr)
  console.timeEnd("传统三个排序")
  return arr
}

function compare2(x,y,z){
  console.time("新三个排序")
  var arr = []
  arr.push(x)
  arr.push(y)
  arr.push(z)
  arr = arr.sort(function(a,b){
    return a>b
  })
  console.log(arr)
  console.timeEnd("新三个排序")
  return arr
}
function compare3(x,y,z){
  console.time("升级三个排序")
  x>y&& (x+=y,y=x-y,x-=y);
  y>z&& (y+=z,z=y-z,y-=z);
  x>z&& (x+=z,z=x-z,x-=z)
  console.timeEnd("升级三个排序")
  console.log(x,y,z)
  return (x,y,z)
}