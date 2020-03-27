/*
Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.

Note:

All numbers will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: k = 3, n = 7
Output: [[1,2,4]]
Example 2:

Input: k = 3, n = 9
Output: [[1,2,6], [1,3,5], [2,3,4]]

https://leetcode.com/problems/combination-sum-iii/
*/

var combinationSum3 = function(k, n) {
    let result = [];
    let tmp = [];
    let start = 1;
    helper(start, tmp, result, n, k);
    return result
};

function helper(start, tmp, result, n, k) {
    // Base case
    if(n < 0 || tmp.length > k) {
        return;
    }

    if(tmp.length === k && n === 0) {
        result.push(tmp);
        return;
    }

    for(let i = start; i <= 9; i++) {
        // Skip numbers that are greater than our target
        if(n < i) {
            return;
        }
        tmp.push(i);
        helper(i + 1, tmp.concat(), result, n - i, k);
        tmp.pop();
    }
}