/*
Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.

Example 1:

Input: [5,7]
Output: 4
Example 2:

Input: [0,1]
Output: 0

https://leetcode.com/problems/bitwise-and-of-numbers-range/
*/

var rangeBitwiseAnd = function(m, n) {
    let difference = n - m;
    let num = 0;
    while(difference > 0) {
        difference >>= 1;
        n  >>= 1;
        m >>= 1;
        num += 1;
    }
    let result = m & n;
    for(let i = 0 ; i < num; i++) {
        result <<= 1;
    }
    return result;
};