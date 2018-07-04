/*

Given a positive integer, output its complement number. The complement strategy is to flip the bits of its binary representation.

Note:
The given integer is guaranteed to fit within the range of a 32-bit signed integer.
You could assume no leading zero bit in the integer’s binary representation.
https://leetcode.com/problems/number-complement/description/

*/


var findComplement = function(num) {
    return parseInt(''+num.toString(2).split('').map(Number).map(digit => digit == 1 ? 0 : 1).join(''), 2);
};
