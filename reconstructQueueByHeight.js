/*
Suppose you have a random list of people standing in a queue. Each person is described by a
pair of integers (h, k), where h is the height of the person and k is the number of people in front of this person who have a height greater than or equal to h. Write an algorithm to reconstruct the queue.

Note:
The number of people is less than 1,100.

 
Example

Input:
[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]

Output:
[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

https://leetcode.com/problems/queue-reconstruction-by-height/
*/

// Time O(N)
var reconstructQueue = function(people) {
  people = people.sort((a,b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
  // Sorted based on height [[7,0], [7,1], [6,1], [5,0], [5,2], [4,4]]
  let result = [];
  // Once sorted, set people on k position in the array
  for(let p of people) {
      let [height, k] = p;
      result.splice(k, 0, p);
  }
  return result;
};