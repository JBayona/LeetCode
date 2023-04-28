/*
Given an array of n integers where n > 1, nums, return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Solve it without division and in O(n).

For example, given [1,2,3,4], return [24,12,8,6].

Follow up:
Could you solve it with constant space complexity? (Note: The output array does not count as extra space for the purpose of space complexity analysis.)

https://leetcode.com/problems/product-of-array-except-self/description/
*/

//O(n)

var productExceptSelf = function(nums) {
    let left = [];
    let right = [];
    let result = [];
    let n = nums.length;
    
    //First element in the left array is always 1
    left[0] = 1;
    //Last element in the right array is always 1
    right[n-1] = 1;
    
    /* Construct the left array */
    for(let i = 1; i < n; i++){
        left[i] = nums[i-1] * left[i-1];
    }
    
    /* Construct the right array */
    for(let i = n-2; i >=0; i--){
        right[i] = nums[i+1] * right[i+1];
    }
    
    /* Construct the result array */
    for(let i = 0; i < n; i++){
        result[i] = left[i] * right[i];
    }
    return result;
};

//O(1)
var productExceptSelf = function(nums) {
    let result = [];
    let tmp = 1;
    let n = nums.length;

    /*In this loop, tmp variable contains product
    of elements on left side excluding nums[i]*/
    for(let i = 0; i < n; i++){
      result[i] = tmp;
      tmp *= nums[i];
    }

    //Initialize tmp ride side to 1
    tmp = 1;
    /*In this loop, tmp variable contains product
    of elements on ride side excluding nums[i]*/
    for(let i = n-1; i >= 0; i--){
      result[i] *= tmp;
      tmp *= nums[i];
    }

    return result;
};

// O(n^2)

var productExceptSelf = function(input){
	let result = [];
  for(let i = 0; i < input.length; i++) {
  	let product = 1;
  	for(let j = 0; j < input.length; j++) {
    	if(i === j ) {
      	continue;
      }
      product *= input[j];
    }
    result[i] = product;
  }
  return result;
}

//left [1,1,2,8]
//right [40,20,5,1]
array = [1,2,4,5]; // [40, 20, 10, 8]
console.log(productExceptSelf(array));
