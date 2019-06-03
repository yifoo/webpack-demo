function Foo() {
  return this;
}
Foo.getName = function () {
  // console.log('1');
};
Foo.prototype.getName = function () {
  // console.log('2');
};

new Foo.getName();   // -> 1
new Foo().getName(); // -> 2


function Human(name,age){
  this.name=name
  this.age=age
}

var xiao = new Human('xiaowang',12)

// console.log(xiao instanceof Human)
// console.log(xiao.__proto__===Human.prototype)


function foo(name) {
	console.log(this.a,name)
}
var a = 1
foo()

var obj = {
	a: 2,
	foo: foo
}
obj.foo(123123)