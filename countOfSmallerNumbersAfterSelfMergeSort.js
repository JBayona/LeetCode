/*
You are given an integer array nums and you have to return a new counts array. The counts array has the
property where counts[i] is the number of smaller elements to the right of nums[i].

Example 1:
Input: nums = [5,2,6,1]
Output: [2,1,1,0]

Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.

Example 2:
Input: nums = [-1]
Output: [0]

Example 3:
Input: nums = [-1,-1]
Output: [0,0]

https://leetcode.com/problems/count-of-smaller-numbers-after-self/
*/

var countSmaller = function(nums) {
    let result = [];
    let originalIndex = nums.map((n, index) => index);
    count = new Array(nums.length).fill(0);
    mergeSort(nums, originalIndex, 0, nums.length - 1);
    
    for(let i = 0; i < nums.length; i++) {
        result.push(count[i]);
    }
    return result;
};

function mergeSort(nums, originalIndex, low, high) {
    if(low < high) {
        let mid = Math.floor((low + high) / 2);
        mergeSort(nums, originalIndex, low, mid);
        mergeSort(nums, originalIndex, mid+1, high);
        merge(nums, originalIndex, low, mid, high);
    }
}

function merge(nums, originalIndex, low, mid, high) {
    let lowArrSize = mid-low+1;
    let rightArrSize = high - mid;
    
    let leftArray = new Array(lowArrSize).fill(0);
    let rightArray = new Array(rightArrSize).fill(0);
    
    for(let i = 0; i < leftArray.length; i++) {
        leftArray[i] = originalIndex[low+i];
    }
    
    for(let i = 0; i < rightArray.length; i++) {
        rightArray[i] = originalIndex[i+mid+1];
    }
    
    let i = 0;
    let j = 0;
    let k = low;
    let rightCount = 0;
    while(i < lowArrSize && j < rightArrSize) {
        if(nums[leftArray[i]] <= nums[rightArray[j]]) {
            originalIndex[k] = leftArray[i];
            count[leftArray[i]] += rightCount;
            i++;
        } else {
            originalIndex[k] = rightArray[j];
            rightCount++;
            j++;
        }
        k++;
    }
    
    // What we left in the left side
    while(i < leftArray.length) {
        originalIndex[k] = leftArray[i];
        count[leftArray[i]] += rightCount;
        i++;
        k++;
    }
    
    // What we left in the left side
    while(j < rightArray.length) {
        originalIndex[k] = rightArray[j];
        j++;
        k++;
    }
}