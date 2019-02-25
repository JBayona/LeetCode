/*
Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

For example,
Given [100, 4, 200, 1, 3, 2],
The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.

Your algorithm should run in O(n) complexity.

https://leetcode.com/problems/longest-consecutive-sequence/description/
*/

// Time complexity O(N)
// Space complexity O(N)
var longestConsecutive = function(nums) {
    
  // If there's no number in the array, return 0
  if(!nums.length) {
      return 0;
  }
  
  let hash = {};
  // Store all the elements in the hash
  for(let i = 0; i < nums.length; i++) {
      hash[nums[i]] = true;
  }
  
  // Minimum longest should be 1
  let count = 1;
  let result = 1;
  let current = null;
  for(let prop in hash) {
    let num = parseInt(prop);
    count = 1;
    current = num;
    while(current + 1 in hash) {
      current++;
      count++;
      result = Math.max(count, result);
    }
  }
  
  return result;
};

// Option 2
var longestConsecutive = function(nums) {
    var map = {};
    var value = 0;
    var left = 0;
    var right = 0;
    //We start counting from one
    var currCount = 0;
    var max = 0;
    //Track visited elements
    var visited = new Array(nums.length).fill(false);

    /*Insert elements into map, the key is the element
    and the value is the index*/
    for(let i = 0; i < nums.length; i++){
      map[nums[i]] = i;
    }

    for(var val in map){
      if(visited[map[val]]){
        continue;
      }

      value = parseInt(val);
      left = value - 1;
      right = value + 1;
      currCount = 1;
      visited[map[val]] = true;

      //Means is the last of the sequence
      while(map.hasOwnProperty(left)){
        visited[left] = true;
        currCount++;
        left--;
      }

      //Means is the last of the sequence
      while(map.hasOwnProperty(right)){
        visited[right] = true;
        currCount++;
        right++;
      }

      max = currCount > max ? currCount : max;
    }
    return max;
};

array = [100, 4, 200, 1, 3, 2];
console.log(longestConsecutive(array));