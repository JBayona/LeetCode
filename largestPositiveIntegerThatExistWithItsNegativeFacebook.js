/*
Merge three arrays with no elements duplicated
*/

v; // Time O(N)
var findMaxK = function (nums) {
  let set = new Set();
  let result = -1;
  for (let n of nums) {
    // We either insert negatives or positives
    if (set.has(-n)) {
      result = Math.max(result, Math.abs(n));
    } else {
      set.add(n);
    }
  }
  return result;
};

// Two pointers
// Time O(NLogN)
var findMaxK = function (nums) {
  nums.sort((a, b) => a - b);
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    if (Math.abs(nums[start]) === nums[end] && nums[start] !== nums[end]) {
      return Math.abs(nums[end]);
    }
    if (Math.abs(nums[start]) > nums[end]) {
      start++;
    } else {
      end--;
    }
  }
  return -1;
};
