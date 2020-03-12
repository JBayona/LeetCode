/*
Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Note:

Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
Follow up:

What if the given array is already sorted? How would you optimize your algorithm?
What if nums1's size is small compared to nums2's size? Which algorithm is better?
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

https://leetcode.com/problems/intersection-of-two-arrays-ii/
*/

// Time O(N)
var intersect = function(nums1, nums2) {
    let freq = [];
    let result = [];
    
    for(let i = 0; i < nums2.length; i++) {
        let element = nums2[i];
        freq[element] = freq[element] ? freq[element] + 1 : 1;
    }
    
    console.log(freq);
    
    for(let i = 0; i < nums1.length; i++) {
        let element = nums1[i];
        if(freq[element]  && freq[element] > 0) {
            freq[element]--;
            result.push(element);
        }
    }
    return result;
};

// Time O(N)
var intersect = function(nums1, nums2) {
    let hash = {};
    let hash2 = {};
    let result = [];
    
    hash = generateHash(nums1);
    hash2 = generateHash(nums2);
    
    console.log(hash);
    console.log(hash2);
    
    // Get the result
    for(let num in hash) {
        if(num in hash2) {
            let times = Math.min(hash[num], hash2[num]);
            addTimes(result, times, num);
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
    
function addTimes(array, times, value) {
    for(let i = 0; i < times; i++) {
        array.push(value);
    }
}