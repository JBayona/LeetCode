function swapZerosLeft(array) {
let index = 0;
  for(let i = 0; i < array.length; i++) {
  if(!array[i]) {
    array[i] = array[index];
      array[index++] = 0;
    }
  }
  return array;
}

array = [1,3,0,2,4,0,5,7,6,0,2,3];
console.log(swapZerosLeft(array));

function swapZerosRight(array) {
let index = 0;
  let tmp = 0;
  for(let i = 0; i < array.length; i++) {
  if(array[i]) {
    tmp = array[i];
      array[i] = array[index];
      array[index++] = tmp;
    }
  }
  return array;
}

array = [1,3,0,2,4,0,5,7,6,0,2,3];
console.log(swapZerosRight(array));