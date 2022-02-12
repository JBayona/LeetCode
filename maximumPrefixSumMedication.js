//
// Given a list of prescription medications and start and end dates for each
// write a program that determines the maximum number of prescriptions that a person
// has had active at any point in time
//
//  [(A, 1, 5), (B, 2, 4), (C, 6, 8), (D, 4, 6)]   
//  [(A, 1, 5), (B, 2, 4), (D, 4, 6) (C, 6, 8)]
// 
//answer: 3


function findMaximumAtGivenTime(arr, day) {
  // Get maximum
  let tmp = [];
  for(let elem of arr) {
    let [start, end] = elem;
    tmp.push(end);
  }
  let max = Math.max(...tmp);

  let compute = new Array(max + 1).fill(0);
  for(let elem of arr) {
    let [start, end] = elem;
    compute[start]++;
    compute[end]--;
  }
  
  // At this point we already have the computed array
  let result = 0;
  for(let i = 0; i <= day; i++) {
    result+=compute[i];
  }
  return result;
}

let arr = [[1, 5], [2, 4], [6, 8], [4, 6]];

// Maximo día 1
console.log(findMaximumAtGivenTime(arr, 1)); // 1
console.log(findMaximumAtGivenTime(arr, 2)); // 2
console.log(findMaximumAtGivenTime(arr, 3)); // 2
console.log(findMaximumAtGivenTime(arr, 4)); // 2
console.log(findMaximumAtGivenTime(arr, 5)); // 1
console.log(findMaximumAtGivenTime(arr, 6)); // 1
console.log(findMaximumAtGivenTime(arr, 7)); // 1
console.log(findMaximumAtGivenTime(arr, 8)); // 0