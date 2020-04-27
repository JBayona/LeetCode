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

https://leetcode.com/problems/jump-game-ii/
*/

/*
* Space complexity O(n) to maintain result and min jumps
* Time complexity O(n^2)
*/
var jump = function(nums) {
    let jump = new Array(nums.length);
    let comingFromIndex = new Array(nums.length);
    jump[0] =  0;
    comingFromIndex[0] =  0;
    
    // Set max for all values
    for(let i = 1; i < nums.length ; i++){
        jump[i] = Number.MAX_SAFE_INTEGER;
    }
    
    for(let i = 1; i < nums.length; i++){
        for(let j = 0; j < i; j++){
            if(nums[j] + j >= i){
                jump[i] = Math.min(jump[i], jump[j] + 1);
                // if(jump[i] > jump[j] + 1){
                //     comingFromIndex[i] = j;
                //     jump[i] = jump[j] + 1;
                // }
            }
        }
    }
    
    console.log(comingFromIndex);
    return jump[jump.length-1];
};

var jump = function(nums) {
    if (nums.length == 1) {
            return 0;
    }
    let count = 0;
    let i = 0;
    while (i + nums[i] < nums.length - 1) {
        let maxVal = 0;
        let maxValIndex = 0;
        for (let j = 1; j <= nums[i]; j++) {
            if (nums[j + i] + j > maxVal) {
                maxVal = nums[j + i] + j;
                maxValIndex = i + j;
            }
        }
        i = maxValIndex;
        count++;
    }
    return count + 1;
};