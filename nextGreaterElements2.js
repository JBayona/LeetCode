/*
Given a circular array (the next element of the last element is the first element of the array), print the
Next Greater Number for every element. The Next Greater Number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, output -1 for this number.

Example 1:
Input: [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number; 
The second 1's next greater number needs to search circularly, which is also 2.
Note: The length of given array won't exceed 10000.

https://leetcode.com/problems/next-greater-element-ii/

https://leetcode.com/problems/sum-of-subarray-minimums/discuss/178876/stack-solution-with-very-detailed-explanation-step-by-step
*/

// Time O(N^2)
var nextGreaterElements = function(nums) {
    if(!nums.length) {
        return [];
    }
    
    let result = new Array(nums.length).fill(-1);
    
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < i + nums.length; j++) {
            if(nums[j % nums.length] > nums[i]) {
                result[i] = nums[j % nums.length];
                break;
            }
        }
    }
    return result;
    
};

// Time O(N)
var nextGreaterElements = function(nums) {
    if(!nums.length) {
        return [];
    }
    
    let result = new Array(nums.length).fill(-1);
    let stack = [];
    for(let i = 0; i < nums.length; i++) {
        // peek - find the first greater element to the right
        while(stack.length && nums[i] > nums[stack[stack.length-1]]) {
            let pop = stack.pop();
            result[pop] = nums[i];
        }
        stack.push(i);
    }
    
    // At this point we already have the next greater element to the right
    console.log(result);
    
    // If we run again the same logic we should have the iteration from the
    // left as well as we have updated the values from left to right
    for(let i = 0; i < nums.length; i++) {
        // peek - find the firs greater element to the right
        while(stack.length && nums[i] > nums[stack[stack.length-1]]) {
            let pop = stack.pop();
            result[pop] = nums[i];
        }
        stack.push(i);
    }
    
    console.log(result);
    return result;
    
};

