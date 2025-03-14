/*
You are given a 0-indexed integer array candies. Each element in the array denotes a pile of candies of size candies[i]. You can divide each pile
into any number of sub piles, but you cannot merge two piles together.

You are also given an integer k. You should allocate piles of candies to k children such that each child gets the same
number of candies. Each child can be allocated candies from only one pile of candies and some piles of candies may go unused.

Return the maximum number of candies each child can get.
Example 1:
Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now
have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child
cannot receive more than 5 candies.

Example 2:
Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each
child gets no candy and the answer is 0.

https://leetcode.com/problems/maximum-candies-allocated-to-k-children/description/?envType=daily-question&envId=2025-03-14
*/

// Time O(NLogN)
// Space O(1)
var maximumCandies = function (candies, k) {
  let start = 1;
  let end = -Infinity;

  // Step 1: Find the maximum numbers of candies in a pile
  end = Math.max(...candies);

  let result = 0;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    // Check if we can distribute "mid" canfies per child to at least "k" children
    if (check(candies, k, mid)) {
      result = mid;
      // Try a larger answer
      start = mid + 1;
    } else {
      // Reduce the search space
      end = mid - 1;
    }
  }
  // Maximum candies per children
  return result;
};

function check(candies, k, mid) {
  let count = 0;
  for (let candy of candies) {
    // Each pile contributes "candy / mid" children
    count += Math.floor(candy / mid);
    if (count >= k) {
      return true; // At least "k" children can be satisfied
    }
  }
  return false;
}
