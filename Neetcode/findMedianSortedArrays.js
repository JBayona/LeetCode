/*
Given two sorted arrays nums1 and nums2 of size m and n respectively, return
the median of the two sorted arrays.

Follow up: The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Example 3:
Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000

Example 4:
Input: nums1 = [], nums2 = [1]
Output: 1.00000

Example 5:
Input: nums1 = [2], nums2 = []
Output: 2.00000

https://leetcode.com/problems/median-of-two-sorted-arrays/
*/

// Time O(N+M)
// Space O(N+M)
var findMedianSortedArrays = function(nums1, nums2) {
    let indexA = 0;
    let indexB = 0;
    let merged = [];
    let index = 0;
    let elements = nums1.length + nums2.length;
   
    // Merge two arrays
    while(indexA < nums1.length && indexB < nums2.length) {
        if(nums1[indexA] < nums2[indexB]) {
            merged[index++] = nums1[indexA++];
        } else {
            merged[index++] = nums2[indexB++];
        }
    }
   
    // If there's still elements in nums1 array
    while(indexA < nums1.length) {
        merged[index++] = nums1[indexA++];
    }
   
    // If there's still elements in nums2 array
    while(indexB < nums2.length) {
        merged[index++] = nums2[indexB++];
    }
   
    // Find median
    let mid = 0;
    // Even number
    if(elements % 2 === 0) {
        mid = Math.floor(elements / 2);
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        mid = Math.floor(elements / 2);
        return merged[mid];
    }
};

/*
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        if (n1 > n2)
            return findMedianSortedArrays(nums2, nums1);
            
        int low = 0, high = n1;
        while (low <= high) {
            int cut1 = (low + high) / 2;
            int cut2 = (n1 + n2 + 1) / 2 - cut1;

            int left1 = (cut1 == 0) ? -1e7 : nums1[cut1 - 1];
            int left2 = (cut2 == 0) ? -1e7 : nums2[cut2 - 1];
            int right1 = (cut1 == n1) ? 1e7 : nums1[cut1];
            int right2 = (cut2 == n2) ? 1e7 : nums2[cut2];

            if (left1 <= right2 && left2 <= right1) {
                if ((n1 + n2) % 2 == 1)
                    return max (left1, left2);
                else
                    return (max (left1, left2) + min (right1, right2)) / 2.0;    
            } 
            else if (left1 > right2) 
                high = cut1 - 1;
            else 
                low = cut1 + 1;
        }    
        return 0.0;
    }
};
*/