/*
Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

For example,
If n = 4 and k = 2, a solution is:

[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]

https://leetcode.com/problems/combinations/description/
*/

var combine = function(n, k) {
    var result = [];
    helper(result, [], 1, n, k);
    return result;
};

function helper(result, currArr, start, n, k){
  if(currArr.length === k){
    result.push(currArr);
    return currArr;
  }
  for(let i = start; i <= n; i++){
    currArr.push(i);
    helper(result, currArr.concat(), i + 1, n, k);
    currArr.pop();
  }
}

n = 4;
k = 2
console.log(combine(n, k));