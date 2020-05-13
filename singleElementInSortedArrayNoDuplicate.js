/*
You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.
Find this single element that appears only once.

Example 1:

Input: [1,1,2,3,3,4,4,8,8]
Output: 2
Example 2:

Input: [3,3,7,7,10,11,11]
Output: 10

https://leetcode.com/problems/single-element-in-a-sorted-array/
*/

/*
Suppose array is [1, 1, 2, 2, 3, 3, 4, 5, 5]
we can observe that for each pair, 
first element takes even position and second element takes odd position
for example, 1 is appeared as a pair,
so it takes 0 and 1 positions. similarly for all the pairs also.

this pattern will be missed when single element is appeared in the array.

From these points, we can implement algorithm.
1. Take left and right pointers . 
    left points to start of list. right points to end of the list.
2. find mid.
    if mid is even, then it's duplicate should be in next index.
    or if mid is odd, then it's duplicate  should be in previous index.
    check these two conditions, 
    if any of the conditions is satisfied,
    then pattern is not missed, 
    so check in next half of the array. i.e, left = mid + 1
    if condition is not satisfied, then the pattern is missed.
    so, single number must be before mid.
    so, update end to mid.
3. At last return the nums[left]

Time: -  O(logN)
space:-  O(1)
*/
var singleNonDuplicate = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    while(left < right) {
        let mid = Math.floor((left + right)/2);
        if(mid % 2 === 0 && nums[mid] === nums[mid+1] || mid % 2 === 1 && nums[mid] === nums[mid-1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
};

var singleNonDuplicate = function(nums) {
    let map = {};
    for(let i = 0; i < nums.length; i++) {
        let item = nums[i];
        if(item in map) {
            map[item]++;
        } else {
            map[item] = 1;
        }
    }
    
    // Get the result
    for(let prop in map) {
        if(map[prop] === 1) {
            return prop;
        }
    }
};