function fibon(n){
  if(n===0||n===1) return 1
  return fibon(n-1)+fibon(n-2)
}

console.log(fibon(10))