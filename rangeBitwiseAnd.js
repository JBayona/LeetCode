/*
Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.

Example 1:

Input: [5,7]
Output: 4
Example 2:

Input: [0,1]
Output: 0

https://leetcode.com/problems/bitwise-and-of-numbers-range/
https://leetcode.com/problems/bitwise-and-of-numbers-range/discuss/592288/100-memory!-C%2B%2B-solution-with-explanation

// Good solution
https://www.youtube.com/watch?v=ojCd7PqeCwM&feature=youtu.be&fbclid=IwAR2pLt89p_y8RmwrC53h3velh0fsakcen9O9_vLJA1r5sWj7LS3SE6AMoks
*/


// m = 5 = 101
// n = 7 = 111

// First right shift
// m = 10
// n = 11
// count = 1

// Second right shift
// m = 1
// n = 1
// count = 2

// Sale del  while
// Hacemos left shift count veces (2)
// return 100 = 4
var rangeBitwiseAnd = function(m, n) {
    let count = 0;
    while(m !== n) {
        m >>= 1;
        n >>= 1;
        count++;
    }
    return m << count;
};


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