/*
Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Note:

Each element in the result must be unique.
The result can be in any order.

https://leetcode.com/problems/intersection-of-two-arrays/

*/

// Opción 1

// Time: O(N)
// Space: O(m + n)
var intersection = function(nums1, nums2) {
    let result = [];
    
    let set1 = new Set(nums1);
    let set2 = new Set(nums2);
    
    set1.forEach((item) => {
        if(set2.has(item)) {
            result.push(item)
        }
    });
    
    return result;
};

// Opción 2

var intersection = function(nums1, nums2) {
    let hash = {};
    let hash2 = {};
    let result = [];
    
    hash = generateHash(nums1);
    hash2 = generateHash(nums2);
    
    // Get the result
    for(let num in hash) {
        if(num in hash2) {
            result.push(num);
        }
    }
    
    return result;
};

function generateHash(array) {
    let hash = {};
    for(let i = 0; i < array.length; i++) {
        if(array[i] in hash) {
            hash[array[i]]++;
        } else {
            hash[array[i]] = 1;
        }
    }
    return hash;
}