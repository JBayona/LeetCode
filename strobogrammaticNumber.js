/*
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Write a function to determine if a number is strobogrammatic. The number is represented as a string.

For example, the numbers "69", "88", and "818" are all strobogrammatic.

https://leetcode.com/problems/strobogrammatic-number/
*/

var isStrobogrammatic = function(num) {
    let hash = {};
    hash['0'] = '0';
    hash['1'] = '1';
    hash['6'] = '9';
    hash['8'] = '8';
    hash['9'] = '6';

    let left = 0;
    let right = num.length - 1;
    while(left <= right) {
        let leftChar = num[left];
        if(!(leftChar in hash) || hash[leftChar] !== num[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(isStrobogrammatic('69')); // true
console.log(isStrobogrammatic('88')); // true
console.log(isStrobogrammatic('818')); // true
console.log(isStrobogrammatic('86')); // false