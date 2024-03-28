/*
Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum
integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.

Note that an integer is said to be common to nums1 and nums2 if both arrays
have at least one occurrence of that integer.

Example 1:
Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest element common to both arrays is 2, so we return 2.

Example 2:
Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
Output: 2
Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.

https://leetcode.com/problems/minimum-common-value/description/?envType=daily-question&envId=2024-03-09
*/
// Time O(N)
// Space O(1)
var getCommon = function (nums1, nums2) {
  let index = 0;
  let index2 = 0;
  while (index < nums1.length && index2 < nums2.length) {
    if (nums1[index] === nums2[index2]) {
      return nums1[index];
    }
    if (nums1[index] > nums2[index2]) {
      index2++;
    } else {
      index++;
    }
  }
  return -1;
};
