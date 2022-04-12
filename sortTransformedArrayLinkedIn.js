/*
Given a sorted integer array nums and three integers a, b and c, apply a quadratic
function of the form f(x) = ax2 + bx + c to each element nums[i] in the array, and return the array in a sorted order.

Example 1:
Input: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
Output: [3,9,15,33]

Example 2:
Input: nums = [-4,-2,2,4], a = -1, b = 3, c = 5
Output: [-23,-5,1,7]

https://leetcode.com/problems/sort-transformed-array/
*/

// Time O(N)
// For quadratic eq, if a>= 0 , the graph is upward. so the values are converging as we down
// from higher to lowe values of 'x'
// if a< 0, graph is downward, so the values are diverging
// as we down from higher to lowe values of 'x'
var sortTransformedArray = function (nums, a, b, c) {
  let left = 0;
  let right = nums.length - 1;
  let arr = new Array(nums.length).fill(0);
  let counter = a >= 0 ? nums.length - 1 : 0;

  while (left <= right) {
    let l = quadraticFn(a, b, c, nums[left]);
    let r = quadraticFn(a, b, c, nums[right]);
    if (a >= 0) {
      // Parabola is up, converging from higher to lower values of f
      if (l >= r) {
        arr[counter--] = l;
        left++;
      } else {
        arr[counter--] = r;
        right--;
      }
    } else {
      // Parabola is down: higher value(x) will be negative
      // - converging from lower/smallest to higher values
      if (l >= r) {
        arr[counter++] = r;
        right--;
      } else {
        arr[counter++] = l;
        left++;
      }
    }
  }
  return arr;
};

function quadraticFn(a, b, c, x) {
  return a * x * x + b * x + c;
}
