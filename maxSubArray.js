/*
Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.

https://leetcode.com/problems/maximum-subarray/description/
*/

// Time O(N)
// Space O(1).
var maxSubArray = function(nums) {
    var max = Number.MIN_SAFE_INTEGER;
    var sum = 0;
    for(let i = 0; i < nums.length; i++){
        sum += nums[i];
        // We could have negative numbers
        if(nums[i] > sum){
            sum = nums[i];
        }
        max = Math.max(max, sum);
    }
    return max;
};

var maxSubArray = function(nums) {
    var max = Number.MIN_SAFE_INTEGER;
    var sum = 0;
    for(let i = 0; i < nums.length; i++){
      sum += nums[i];
      if(sum > max){
        max = sum;
      }
      if(sum < 0){
        sum = 0;
      }
    }
    return max;
};

array = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(array));
