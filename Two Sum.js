/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

Complex O(n)
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var hash = {};
    var complement = 0;
    var element = 0;

    for(var i = 0; i < nums.length; i++){
	  //Store the element in the array for quick access
	  element = nums[i];
	  //We need to check the complement for the target
	  complement = target - element;
	  //If we saw the complement, we have found the indexs
      if(complement in hash){
      	return [hash[complement], i];
      }else{ //We store the element with the index it has
      	hash[element] = i;
      }
    }
};

nums = [2, 7, 11, 15];
target = 9;
console.log(twoSum(nums,target));