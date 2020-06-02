
// Given an array of integers, find how many ascending order and descending
// order sequence is it build
// One order sequence
// 1 3 5 18 (ascending sequence)
// 7 4 2 1 (descending sequence)

// Two order sequence:
// 5 3 1 5 6 7
// 5 8 19 14 4 1

function getSequences(input) {
  if(input.length === 0) {
    return 0;
  }
  if(input.length <= 0) {
    return 1;
  }
  let isIncreasing = 0; // 1 for inscrease, 0 for flat, -1 for decrease
  let result = 1;
  for(let i = 1; i < input.length; i++) { /// 7 7
    if(input[i] < input[i-1]) { // Decreasing
      if(isIncreasing === 0) {
        isIncreasing = -1;
      } else if(isIncreasing === 1) {
        result += 1;
        isIncreasing = -1;
      }
    } else if(input[i] > input[i-1]) { // Increasing
      if(isIncreasing === 0) {
        isIncreasing = 1;
      } else if(isIncreasing === -1) {
        result += 1;
        isIncreasing = 1;
      }
    }
  }
  return result;
}

// sequence = [1, 3, 5, 18]; // 1
sequence = [7, 4, 2, 1];  // 1
sequence = [1, 1, 1, 1]; // 1
sequence = [5, 3, 1, 5, 6, 7]; // 2
sequence = [5, 3, 1, 5, 6, 7, 6, 5]; // 3
sequence = [5, 3, 1, 5, 6, 7, 6, 5, 4, 3, 4, 5]; // 4
console.log(getSequences(sequence));