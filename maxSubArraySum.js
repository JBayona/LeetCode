/*
Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.

https://leetcode.com/problems/maximum-subarray/description/
*/

// Time O(N)
// Space O(1)
var maxSubArray = function(nums) {
    // Kadane's algorithm max sum normal array
    let currentMax = nums[0];
    let result = nums[0];
    for(let i = 1; i < nums.length; i++) {
        currentMax += nums[i];
        // Current max could be either the sum or the current
        // number in case it´s greater than previous sum
        currentMax = Math.max(nums[i], currentMax);
        // Update our result
        result = Math.max(currentMax, result);
    }
    return result;
};

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
