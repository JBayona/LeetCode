/*
Given an array of non-negative integers arr, you are initially positioned at start index of the array.
When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach any index with value 0.

Notice that you can not jump outside of the array at any time.

Example 1:

Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: 
All possible ways to reach at index 3 with value 0 are: 
index 5 -> index 4 -> index 1 -> index 3 
index 5 -> index 6 -> index 4 -> index 1 -> index 3 

Example 2:
Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true 
Explanation: 
One possible way to reach at index 3 with value 0 is: 
index 0 -> index 4 -> index 1 -> index 3

Example 3:
Input: arr = [3,0,2,1,2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.

https://leetcode.com/problems/jump-game-iii/description/?envType=study-plan-v2&envId=graph-theory
*/

// BFS
// Memory (V + E)
// Space (V + E)
var canReach = function (arr, start) {
  let visited = new Set();

  let queue = [start];

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let index = queue.shift();

      if (arr[index] === 0) {
        return true;
      }

      if (visited.has(index)) {
        continue;
      }
      visited.add(index);

      let next = index + arr[index];
      let prev = index - arr[index];

      if (next < arr.length) {
        queue.push(next);
      }
      if (prev >= 0) {
        queue.push(prev);
      }
    }
  }
  return false;
};
