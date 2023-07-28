/*
Given a list of non-negative integers nums, arrange them such that they form the
largest number.
Note: The result may be very large, so you need to return a string
instead of an integer.

Example 1:
Input: nums = [10,2]
Output: "210"

Example 2:
Input: nums = [3,30,34,5,9]
Output: "9534330"

Example 3:
Input: nums = [1]
Output: "1"

Example 4:
Input: nums = [10]
Output: "10"

https://leetcode.com/problems/largest-number/
*/

var largestNumber = function(nums) {
    // Convert to array of strings
    let stringArr = nums.map(item => item.toString());
    
    // Custom sort
    stringArr.sort((a, b) => {
        if(a+b > b+a) {
            return -1;
        } else if(b+a > a+b) {
            return 1;
        }
        return 0;
    });
    // Cases where "00" we need to return just "0"
    return stringArr[0] === '0' ? '0' : stringArr.join('');
};
