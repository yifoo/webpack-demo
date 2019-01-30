/*
 * @Author: wuhao 
 * @Date: 2019-01-27 21:20:11 
 * @Desc: 迭代器模式
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-27 21:27:04
 */
var each = function (obj, callback) {
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback.call(obj[i], i, obj[i])
    }
  } else {
    for (var j in obj) {
      callback.call(obj[j], j, obj[j])
    }
  }
  return obj
}


each({
  name: 23,
  age: 49,
  soxoa: 'sd'
}, function (index, item) {
  console.log(index, item)
})