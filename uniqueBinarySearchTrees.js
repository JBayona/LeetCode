/*
Given n, how many structurally unique BST's (binary search trees) that store values 1...n?
For example,
Given n = 3, there are a total of 5 unique BST's.

https://leetcode.com/problems/unique-binary-search-trees/description/
https://www.programcreek.com/2014/05/leetcode-unique-binary-search-trees-java/
*/

//DP
// Time: O(n^2)
// Space: O(n)
// https://www.youtube.com/watch?v=YDf982Lb84o
// Catalan number
var numTrees = function(n) {
    let result = []; 
    result[0] = 1;
    result[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        result[i] = 0;
        for (let j = 0; j < i; j++) {
            result[i] += result[j] * result[i - j - 1];
        }
        
    }
    return result[n];
};

n = 3;
console.log(numTrees (n));

