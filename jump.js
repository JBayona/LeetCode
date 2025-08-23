/*
Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

Example:

Input: [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2.
    Jump 1 step from index 0 to 1, then 3 steps to the last index.

Note:
You can assume that you can always reach the last index.

https://leetcode.com/problems/jump-game-ii/description/

Reference:
https://www.youtube.com/watch?v=cETfFsSTGJI&t=79s
https://www.youtube.com/watch?v=jH_5ypQggWg
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/*
* Space complexity O(n) to maintain result and min jumps
* Time complexity O(n^2)
*/
var jump = function(nums) {
    let min_jumps = new Array(nums.length).fill(Number.MAX_SAFE_INTEGER);
    let path_jump = new Array(nums.length).fill(0);
    
    // First value is 0 because we the min to reach index 0 is 0, it's the starting point
    min_jumps[0] = 0;
    
    for(let i = 1; i < nums.length; i++) {
        for(let j = 0; j < i; j++) {
            // Check wether i is in range of j based on the allowed jumps
            if(i <= j + nums[j]) {
               if(min_jumps[j] + 1 < min_jumps[i]) {
                   min_jumps[i] = min_jumps[j] + 1;
                   path_jump[i] = j;
               }
            }
        }
    }
    
    console.log(min_jumps);
    console.log(path_jump);
    return min_jumps[nums.length-1];
};
