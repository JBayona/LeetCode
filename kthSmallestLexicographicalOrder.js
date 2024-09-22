/*
Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

Example 1:
Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

Example 2:
Input: n = 1, k = 1
Output: 1

https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/description
*/

// The goal is to get the kth smallest number from 1 to n, it's not optimal to generate the entire list
// of numbers, instead, we can get how many steps we need to get to get to the prefix, if those are greater than K
// we jump and there's no need to generate the entire list, we go to the "next level" by multipliying the existing level * 10
// until we find that we are close to get kth
/*
To solve the problem, we initialize the current number as 1 and decrement k by 1. For each step, we calculate how
many numbers start with the current prefix (lexicographical subtree). If the count is greater than k, we move to the next level
by multiplying the current number by 10. Otherwise, we skip the current subtree, decrement k by the number of skipped steps, and move
to the next sibling by incrementing the current number. We repeat this until k reaches zero, meaning we've found the K-th smallest number.
This approach efficiently computes the result in O(log n) time by counting numbers at each prefix.

For example
For n = 13 and k = 2:
Start with prefix 1 and count how many numbers exist: 1, 10, 11, 12, 13 (5 numbers).
Since k = 2 is less than 5, the 2nd number must lie in this subtree.
Dive into the prefix 10. Now we found the k-th number which is 10.
*/
// Intuitive approach should be to compute all prefixes and get the number kth.
// Problem for reference: https://leetcode.com/problems/lexicographical-numbers/description/
// Time O(LogN)
var findKthNumber = function (n, k) {
  // Start from first number
  let current = 1;
  // Decrement to handle the 0-index, it starts from 1
  k--;

  while (k > 0) {
    let steps = computeSteps(current, n);
    // Move to the next current sibling node from 1, 11, etc etc to 2, 20, 200, ..
    if (steps <= k) {
      current++;
      k -= steps;
    } else {
      // Move to the first child
      current *= 10;
      // We have covered the number
      k--;
    }
  }
  return current;
};

function computeSteps(current, n) {
  let steps = 0;
  let first = current;
  let last = current;
  while (first <= n) {
    // Count all steps needed
    steps += Math.min(n + 1, last + 1) - first;
    // Go to the next level
    first *= 10;
    last = last * 10 + 9;
  }
  return steps;
}
