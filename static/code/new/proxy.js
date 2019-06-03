var obj = {
  name: 'xiaowang',
  age: 13
};

var newObj = new Proxy(obj, {
  get(obj, key) {
    return obj[key];
  },
  set(obj, key, newVal) {
    obj[key] = newVal;
  }
});
console.log(newObj.name)
newObj.name='sja'
console.log(newObj.name)
