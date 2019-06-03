export default class BubbleSort {
  constructor($root) {
    this.$root = $('#section');
    this.render();
  }
  //* 冒泡排序
  bubbling(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[i]) {
          var temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
        }
      }
    }
    console.log('bubblingarr', arr);
  }
  //* 插入排序
  insert(arr) {
    var temp;
    for (var i = 0; i < arr.length; i++) {
      temp = arr[i];
      for (var j = i; j >= 0; j--) {
        if (arr[j - 1] > temp) {
          arr[j] = arr[j - 1];
        } else {
          arr[j] = temp;
          break;
        }
      }
    }
    console.log('insertarr: ', arr);
  }
  //* 选择排序
  selection(arr) {
    var min, minIndex, temp;
    for (var i = 0; i < arr.length; i++) {
      (min = arr[i]), (minIndex = i);
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[j] < min) {
          min = arr[j];
          minIndex = j;
        }
      }
      temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
    console.log('selectionarr: ', arr);
  }
  //*快速排序
  quick(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    var midIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(midIndex, 1)[0],
      left = [],
      right = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return this.quick(left).concat([pivot], this.quick(right));
  }
  randowArr(max, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      arr.push(parseInt(Math.random() * max));
    }
    console.log('arr: ', arr);
    return arr;
  }
  render() {
    var randomArr = this.randowArr(100, 10);
    console.time('bubbling');
    this.bubbling(randomArr);
    console.timeEnd('bubbling');
    console.time('insert');
    this.insert(randomArr);
    console.timeEnd('insert');
    console.time('selection');
    this.selection(randomArr);
    console.timeEnd('selection');
    console.time('quick');
    var quickArr = this.quick(randomArr);
    console.log('quickArr: ', quickArr);
    console.timeEnd('quick');
    var tmpl = require('./bubbleSort.art');
    this.$root.html(tmpl());
  }
}
