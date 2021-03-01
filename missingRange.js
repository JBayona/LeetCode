/*
You are given an inclusive range [lower, upper] and a sorted unique integer array nums, where
all elements are in the inclusive range.

A number x is considered missing if x is in the range [lower, upper] and x is not in nums.

Return the smallest sorted list of ranges that cover every missing number exactly.
That is, no element of nums is in any of the ranges, and each missing number is
in one of the ranges.

Each range [a,b] in the list should be output as:
    "a->b" if a != b
    "a" if a == b

Example 1:

Input: nums = [0,1,3,50,75], lower = 0, upper = 99
Output: ["2","4->49","51->74","76->99"]

Explanation: The ranges are:
[2,2] --> "2"
[4,49] --> "4->49"
[51,74] --> "51->74"
[76,99] --> "76->99"

Example 2:
Input: nums = [], lower = 1, upper = 1
Output: ["1"]
Explanation: The only missing range is [1,1], which becomes "1".

Example 3:
Input: nums = [], lower = -3, upper = -1
Output: ["-3->-1"]
Explanation: The only missing range is [-3,-1], which becomes "-3->-1".

Example 4:
Input: nums = [-1], lower = -1, upper = -1
Output: []
Explanation: There are no missing ranges since there are no missing numbers.

Example 5:
Input: nums = [-1], lower = -2, upper = -1
Output: ["-2"]

https://medium.com/@rebeccahezhang/leetcode-163-missing-ranges-6ac21b477e96
*/

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function(nums, lower, upper) {
    let next = lower;
    let result = [];

    for(let i = 0; i < nums.length; i++) {
        // Jump to the next to check if it´s within the range
        if(nums[i] < next) {
            continue;
        }
        // If the numbers are the same it means that we find the first number in
        // the range, so we jump to the next target by one
        if(next === nums[i]) {
            next++;
            continue;
        }

        // Add the missing range and update the next value to nums[i] + 1
        if(nums[i] > next) {
            result.push(getRangeFormat(next, nums[i] - 1));
            next = nums[i] + 1;
        }
    }

    // Check if the greatest element in the array
    // is lower than the upper bound
    if(next <= upper) {
        result.push(getRangeFormat(next, upper));
    }
    return result;
};

function getRangeFormat(n1, n2) {
    return n1 === n2 ? n1.toString() : n1 + "->" + n2;
}

nums = [-1];
lower = -2;
upper = 1;
console.log(findMissingRanges(nums, lower, upper));
