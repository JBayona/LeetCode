/*
Shuffle a set of numbers without duplicates.

Example:

// Init an array with set 1, 2, and 3.
int[] nums = {1,2,3};
Solution solution = new Solution(nums);

// Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.
solution.shuffle();

// Resets the array back to its original configuration [1,2,3].
solution.reset();

// Returns the random shuffling of array [1,2,3].
solution.shuffle();

https://leetcode.com/problems/shuffle-an-array/
*/

/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
  this.initState = [...nums];
  this.array = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
  return this.initState;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
  let min = 0;
  let max = this.array.length;
  for(let i = 0; i < this.array.length; i++) {
    //The maximum is exclusive and the minimum is inclusive
    // Getting a random number between two values
    let index = Math.floor(Math.random() * (max - min)) + min;
    // Swap
    let tmp = this.array[i];
    this.array[i] = this.array[index];
    this.array[index] = tmp;
  }
  return this.array;
};
/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */