var current_id = 0;

function* next_id(num) {
    // current_id ++;
    while(current_id<num){
      yield ++current_id
    }
}
for(var i of next_id(10)){
  console.log('i',i)
}
