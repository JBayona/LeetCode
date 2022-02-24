// Find the second largest

function findSecondLargest(arr) {
  let largest = Number.MIN_SAFE_INTEGER;
  let second = Number.MIN_SAFE_INTEGER;

  for(let num of arr) {
    largest = Math.max(num, largest);
  }

  // Get second largest
  for(let num of arr) {
    if(num !== largest) {
      second = Math.max(second, num);
    }
  }
  return second;
}

let arr = [2, 4, 7, 9, 10, 4, 5];
console.log(findSecondLargest(arr));