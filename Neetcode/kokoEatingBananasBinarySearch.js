/*
Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile ofbananas
and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead
and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
Return the minimum integer k such that she can eat all the bananas within h hours.

Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:
Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:
Input: piles = [30,11,23,4,20], h = 6
Output: 23

https://leetcode.com/problems/koko-eating-bananas/description/
https://leetcode.com/problems/koko-eating-bananas/solutions/769702/python-clear-explanation-powerful-ultimate-binary-search-template-solved-many-problems
*/
/*
How do you know this is a binary search problem?
Because the problem wants you to find some target value and satisfy some property.
But the input array is not sorted and binary search only works for sorted arrays. Yes! That's true.
But for this problem, are we using any of the array elements as our left or right variables? No, we are not.
Infact we won't be using all of them. We will be determining the speed k. In this case, k can be monotonically increasing or decreasing.
When this type of problem statement is given, try using binary search.
*/
// Time O(N Log N)
var minEatingSpeed = function(piles, h) {
  // left = 1 is the minimum speed which is eat one banana every. hour
  let left = 1;
  // Right is eating max all bananas
  let right = Math.max(...piles);
  while (left < right) {
      // middle is our new speed
      let middle = Math.floor((left + right) / 2);
      // Get all hours needed to consume all bananas for each middle
      // Try to set the right boundary to the closest to reach
      // the condition of hours <= h
      let hours = getHours(piles, middle);
      if (hours <= h) {
          right = middle;
      } else {
          left = middle + 1;
      }
  }
  return left;
};

function getHours(piles, mid) {
  let hours = 0;
  // Calculate how many hours you need to eat all bananas
  for (let pile of piles) {
      hours += Math.ceil(pile / mid);
  }
  return hours;
}