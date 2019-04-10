/*
Given a string S and a character C, return an array of integers representing the shortest distance from the character C in the string.

Example 1:

Input: S = "loveleetcode", C = 'e'
Output: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]


For each index S[i], let's try to find the distance to the next character C
going left, and going right. The answer is the minimum of these two values.

Algorithm
When going left to right, we'll remember the index prev of the last character C we've seen. Then the answer is i - prev.
When going right to left, we'll remember the index prev of the last character C we've seen. Then the answer is prev - i.
We take the minimum of these two answers to create our final answer.

https://leetcode.com/problems/shortest-distance-to-a-character/submissions/
*/
// Time O(N)
// Space O(N)
var shortestToChar = function(S, C) {
    let result = [];
    let prev = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < S.length; i++) {
        if (S[i] == C) {
            prev = i;
        }
        result[i] = i - prev;
    }

    prev = Number.MAX_SAFE_INTEGER;
    for (let i = S.length - 1; i >= 0; i--) {
        if (S[i] == C) {
            prev = i;
        }
        result[i] = Math.min(result[i], prev - i);
    }

    return result;
};
