/*
Given an integer n, return true if it is a power of three. Otherwise, return false.
An integer n is a power of three, if there exists an integer x such that n == 3x.

Example 1:
Input: n = 27
Output: true

Example 2:
Input: n = 0
Output: false

Example 3:
Input: n = 9
Output: true

Example 4:
Input: n = 45
Output: false

Constraints:

-231 <= n <= 231 - 1
https://leetcode.com/problems/power-of-three/
*/

// Option 1
var isPowerOfThree = function(n) {
    if(n === 0) {
        return false;
    }
    while(n !== 1) {
        if(n%3 !== 0) {
            return false;
        }
        n = Math.floor(n/3);
    }
    return n === 1;
};

// Option 2
/*
Approach 1: Logarithms -
We can take advantage of the natural mathematical properties of logarithms to
find our solution. If n is a power of 3, then 3^x = n. This can be rewritten as
log3 n = x, where x will be an integer if n is a power of 3.

Since most programming languages can't natively do log3 calculations, we can take
advantage of another property of logarithms: log3 n can be rewritten as log n / log 3. This will
produce a slight amount of floating point error, but any value that is within a close
margin (1e-10) while n is constrained to an int will be a correct.
*/
var isPowerOfThree = function(n) {
    let a = Math.log(n) / Math.log(3)
    return Math.abs(a - Math.round(a)) < 1e-10
};