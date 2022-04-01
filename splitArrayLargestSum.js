/*
Given an array nums which consists of non-negative integers and an integer m, you can
split the array into m non-empty continuous subarrays.
Write an algorithm to minimize the largest sum among these m subarrays.
Example 1:
Input: nums = [7,2,5,10,8], m = 2
Output: 18
Explanation:
There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8],
where the largest sum among the two subarrays is only 18.

Example 2:
Input: nums = [1,2,3,4,5], m = 2
Output: 9

Example 3:
Input: nums = [1,4,4], m = 3
Output: 4

https://leetcode.com/problems/split-array-largest-sum/
*/

// Binary Search
// Time: O(NLogN)
var splitArray = function(nums, m) {
    let total = nums.reduce((acc, curr) => acc + curr, 0);
    let l = 0;
    let r = total;
    while (l <= r) {
        let mid = l + Math.floor((r - l) / 2);
        if (isPossible(nums, mid, m)) {
            r = mid - 1;
        } else{ 
            l = mid + 1;
        }
    }
    return l;
};

function isPossible(nums, minSum, m) {
    let subarraySum = 0;
    let subarrays = 1;
    for (let i = 0; i < nums.length; i++) {
        if (subarraySum + nums[i] > minSum) {
            subarrays++;
            subarraySum = nums[i];
            if (subarraySum > minSum || subarrays > m) {
                return false;
            }
        } else {
            subarraySum += nums[i];
        }
    }
    return true;
}
