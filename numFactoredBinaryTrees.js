/*
Given an array of unique integers, arr, where each integer arr[i] is strictly greater than 1.
We make a binary tree using these integers, and each number may be used for any number of times.
Each non-leaf node's value should be equal to the product of the values of its children.

Return the number of binary trees we can make. The answer may be too large so return the answer modulo 109 + 7.

Example 1:
Input: arr = [2,4]
Output: 3
Explanation: We can make these trees: [2], [4], [4, 2, 2]

Example 2:
Input: arr = [2,4,5,10]
Output: 7
Explanation: We can make these trees: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].

https://leetcode.com/problems/binary-trees-with-factors/
*/

var numFactoredBinaryTrees = function(arr) {
    arr.sort((a, b) => a - b);
    let map = {};
    map[arr[0]] = 1;
    
    let result = 1;
    for (let i = 1; i < arr.length; i++) {
        // Start at 1 because single numbers are always valid
        let current = 1;
        for (let j = 0; j < i; j++) {
            let div = arr[i] / arr[j];
            if (arr[i] % arr[j] === 0 && (div in map)) {
                current += (map[div] * map[arr[j]]);
            }
        }
        map[arr[i]] = current;
        result += current;
    }
    return Number(result % 1000000007);
  };