/*
Given a non-empty integer array of size n, find the minimum number of moves
required to make all array elements equal, where a move is incrementing n - 1 elements by 1.

Example:

Input:
[1,2,3]

Output:
3

Explanation:
Only three moves are needed (remember each move increments two elements):

[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]

https://leetcode.com/problems/minimum-moves-to-equal-array-elements/
*/

var minMoves = function(nums) {
    // Logic behind this: Incrementing every single element except one is the same
    // as decremeting one single element, so the idea here is:
    // 1. Find the smallest element
    // 2. For each element in the array check how much we need to decrement those
    // elements to make them equals to the minimum
    let min = Math.min(...nums);
    let result = 0;
    for(let i = 0; i < nums.length; i++) {
        result += nums[i] - min;
    }
    return result;
};