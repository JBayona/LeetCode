/*
Given a non-empty array of integers, return the k most frequent elements.
For example,
Given [1,1,1,2,2,3] and k = 2, return [1,2].

Note: 
You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

https://leetcode.com/problems/top-k-frequent-elements/description/
*/
// Time O(N)
// Space O(N)
var topKFrequent = function(nums, k) {
    let hash = {};
    let count = new Array(nums.length + 1).fill(0);
    let num = 0;
    let result = [];
    
    // Count frecuencies of the elements in the hash
    for (let i = 0; i < nums.length; i++) {
        num = nums[i];
        if (num in hash) {
            hash[num] = hash[num] + 1;
        } else {
            hash[num] = 1;
        }
    }
    
    // Form our array with frecuencies
    // Example array = [1,1,1,2,3,2,5]
    // count = [0, [3,5], [2], [1], 0,..]
    // The index on the array represents the frecuencies, we insert in the index the 
    // elements that have that frecuencies
    let frequencyVal = 0;
    for(let num in hash) {
        frequencyVal = hash[num];
        if(!count[frequencyVal]) {
            count[frequencyVal] = [num]
        } else {
            count[frequencyVal].push(num)
        }
    }

    // Lets iterate from the back and check if our result is less than
    // the k we have
    for (let i = count.length-1; i > 0 && result.length < k; i--) {
        // If we have frecuencies we add them in the result array
        if (count[i]) {
            result = result.concat(count[i]);
        }
    }
    console.log(count);
    return result;
};

// array = [1,1,1,2,2,3];
array = [1,1,1,2,3,2,5]
//array = [1,1,1,2,2,2,3,4,4,4,6];
k = 2;
console.log(topKFrequent(array, k));
