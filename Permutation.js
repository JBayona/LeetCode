/*
Given a collection of distinct numbers, return all possible permutations.

For example,
[1,2,3] have the following permutations:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
https://leetcode.com/problems/permutations/description/

*/

// Option 1
// Backtrack
var permute = function(nums) {
  let result = [];
  let tmp = [];
  helper(tmp, result, nums);
  return result;
};

function helper(tmp, result, nums) {
  if(tmp.length == nums.length) {
      result.push(tmp);
      return;
  }
  for(let i = 0; i < nums.length; i++) {
      if(!tmp.includes(nums[i])) {
          tmp.push(nums[i]);
          helper(tmp.concat(), result, nums);
          tmp.pop();
      }
  }
}
//Permutacion Heaps Algorithm

var permute = function(nums){
  var result = [];
  heapPermutation(nums, nums.length, nums.length, result);
  return result;
}

//Generating permutation using Heap Algorithm
function heapPermutation(a, size, n, result){
    // if size becomes 1 then prints the obtained
    // permutation
    if (size == 1){
      result.push([...a]);
      //console.log(a);
    }

    for (var i=0; i<size; i++){
        heapPermutation(a, size-1, n, result);

        // if size is odd, swap first and last
        // element
        if (size % 2 == 1){
            var temp = a[0];
            a[0] = a[size-1];
            a[size-1] = temp;
        }

        // If size is even, swap ith and last
        // element
        else{
            var temp = a[i];
            a[i] = a[size-1];
            a[size-1] = temp;
        }
    }
}

array = [1,2,3];
console.log(permute(array));