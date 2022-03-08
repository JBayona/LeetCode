/*
You are given an integer array nums. You want to maximize the number of points
you get by performing the following operation any number of times:

Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete
every element equal to nums[i] - 1 and every element equal to nums[i] + 1.
Return the maximum number of points you can earn by applying the above operation some number of time.
Example 1:
Input: nums = [3,4,2]
Output: 6

Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.

Example 2:
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.

https://leetcode.com/problems/delete-and-earn/
*/

var deleteAndEarn = function (nums) {
  let hash = {};
  let minVal = Number.MAX_SAFE_INTEGER;
  let maxVal = Number.MIN_SAFE_INTEGER;
  for (let num of nums) {
    if (!(num in hash)) {
      hash[num] = 0;
    }
    hash[num]++;
    minVal = Math.min(minVal, num);
    maxVal = Math.max(maxVal, num);
  }
  let prevIncEarn = 0;
  let prevExclEarn = 0;
  for (let i = minVal; i <= maxVal; i++) {
    let incEarn = i in hash ? prevExclEarn + i * hash[i] : prevExclEarn;
    let excEarn = Math.max(prevIncEarn, prevExclEarn);
    prevIncEarn = incEarn;
    prevExclEarn = excEarn;
  }
  return Math.max(prevIncEarn, prevExclEarn);
};
