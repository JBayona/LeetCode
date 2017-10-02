/*
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2. 
The number of elements initialized in nums1 and nums2 are m and n respectively.

https://leetcode.com/problems/merge-sorted-array/description/
*/

var merge = function(nums1, m, nums2, n) {
  /*Empezamos de atrás para el nuevo arreglo*/
  while(m > 0 && n > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
        /*m + n - 1 porque tendra el tamaño de los
        dos arreglos*/
        nums1[m + n - 1] = nums1[m - 1];
        m--;
    } else {
        nums1[m + n - 1] = nums2[n - 1];
        n--;
    }
  }
  
  /*En caso de que el segundo arreglo sea mayor*/
  while (n > 0) {
    nums1[n - 1] = nums2[n - 1];
    n--;
  }
  return nums1;
};

array1 = [1,2,3,4];
array2 = [4,4,4,4,5,6]
console.log(merge(array1, 4, array2, 6));