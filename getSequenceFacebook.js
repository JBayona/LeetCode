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
  for(let i = 0; i < input.length; i++) { /// 7 7
    if(input[i] < input[i-1]) { // Decreasing
      if(isIncreasing === 0) {
        isIncreasing = -1;
      } else if(isIncreasing === 1) {
        result += 1;
        isIncreasing = 1;
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