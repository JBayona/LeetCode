/*
Given an unsorted array of integers, find the length of longest increasing subsequence.

For example,
Given [10, 9, 2, 5, 3, 7, 101, 18],
The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4. 
Note that there may be more than one LIS combination, it is only necessary for
you to return the length.

Your algorithm should run in O(n2) complexity.

Follow up: Could you improve it to O(n log n) time complexity?

https://leetcode.com/problems/longest-increasing-subsequence/description/
https://www.youtube.com/watch?v=CE2b_-XfVDk
*/

//Opcion 1
//Time Complexity - O(N^2)
//Space Complexity - O(N)
//DP
function longestIncreasingSubsequence(nums){
  var max = 1;
  //Al principio todos tienen subsequence de 1
  var array = new Array(nums.length).fill(1);
  if(nums.length === 0) return 0;

  for(var i = 1; i < nums.length; i++){
    for(var j = 0; j < i; j++){
      if(nums[j] < nums[i] && (array[j] + 1 > array[i])){
        array[i] = array[j] + 1;
        max = Math.max(max, array[i]);
      }
    }
  }
  return max;
}

nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(nums));

//Opcion 2
//Time Complexity - O(N^2)
//Space Complexity - O(N)
//DP
function longestIncreasingSubsequence(nums){
  var array = [];
  //Al principio todos tienen subsequence max de 1
  var max = 1;
  if(nums.length === 0) return 0;

  for(var i = 0; i < nums.length; i++){
    array[i] = 1;
    for(var j = 0; j < i; j++){
      if(nums[j] < nums[i] && (array[j] + 1 > array[i])){
        array[i] = array[j] + 1;
        max = Math.max(max, array[i]);
      }
    }
  }
  return max;
}

nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(nums));
