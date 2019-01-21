/*
 * @Author: wuhao 
 * @Date: 2019-01-10 22:25:35 
 * @Desc: 合并对象
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-10 22:28:55
 */
merge([
  {start:1,end:2},
  {start:3,end:5},
  {start:7,end:9},
  {start:10,end:11},
  {start:8,end:12},
  {start:16,end:19},
  {start:13,end:30},
])

function merge(arr) {
  var node = [],
    j = 0
  if (arr.length === 1) {
    return arr
  }
  node.push(arr[0])
  for (var i = 1; i < arr.length; i++) {
    if (arr[i].start >= arr[i - 1].end) {
      arr[j].end = arr[i].end;
      arr[i - 1].end = arr[i].end
    } else {
      node.push(arr[i])
      j++
    }
  }
  console.log('node', node)
  return node
}