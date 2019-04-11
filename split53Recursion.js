
/*
https://codingbat.com/prob/p168295

Given an array of ints, is it possible to divide the ints into two groups, so that the sum of the two groups is the same, with
these constraints: all the values that are multiple of 5 must be in one group, and all the values that are a multiple of 3 (and not a multiple of 5) must be in the other. (No loops needed.)

split53([1, 1]) → true
split53([1, 1, 1]) → false
split53([2, 4, 2]) → true
*/

public boolean split53(int[] nums) {
    int index = 0;
    int sum1 = 0;
    int sum2 = 0;

    return helper(nums, index, sum1, sum2);
}


public boolean helper(int[] nums, int index, int sum1, int sum2) {
  if(index == nums.length) {
    return sum1 == sum2;
  }

  int value = nums[index];
  if(value % 5 == 0) {
    return helper(nums, index + 1, sum1 + value, sum2);
  } else if(value % 3 == 0) {
    return helper(nums, index + 1, sum1, sum2 + value);
  } else {
    return helper(nums, index + 1, sum1 + value, sum2) || helper(nums, index + 1, sum1, sum2 + value);
  }
}

