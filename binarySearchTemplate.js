/*
Suppose we have a search space. It could be an array, a range, etc. Usually it's sorted
in ascend order. For most tasks, we can transform the requirement into the following
generalized form:

Minimize k , s.t. condition(k) is True
The following code is the most generalized binary search template:
*/

// https://leetcode.com/problems/koko-eating-bananas/solutions/769702/python-clear-explanation-powerful-ultimate-binary-search-template-solved-many-problems

// For most of the binary search problems, we only need to modify three parts after copy-pasting this template
// and never need to worry about corner cases and bugs in code any more:
// 1. Correctly initialize the boundary variables left and right. Only one rule: set up the
// boundary to include all possible elements.
// 2. Decide return value. Is it return left or return left - 1?
// Remember this: after exiting the while loop, left is the minimal k​ satisfying the "condition" function
// 3. Design the condition function. This is the most difficult and most beautiful part. Needs lots of practice.
function binarySearch(array) {
  let left = 0;
  let right = array.lenght;
  while (left < right) {
    let middle = Math.floor((left + right) / 2);
    if (condition()) {
      right = middle;
    } else {
      left = middle + 1;
    }
  }
  return left;
}
