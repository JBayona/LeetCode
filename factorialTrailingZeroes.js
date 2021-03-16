/*
Given an integer n, return the number of trailing zeroes in n!.
Follow up: Could you write a solution that works in logarithmic time complexity?

https://leetcode.com/problems/factorial-trailing-zeroes/
*/

// Number of trailing zeroes is the Power of 10 in the expression or
// in other words, the number of times N is divisible by 10.
// For a number to be divisible by 10, it should be divisible by 2 & 5.

// If you want to figure out the exact number of zeroes, you would have to check
// how many times the number N is divisible by 10.

// When I am dividing N by 10, it will be limited by the powers of 2 or 5, whichever is lesser.

// The idea here is that the only thing that counts for the divisibilty by 10
// is the number of available '5' divisers in (n!) because there's more than
// enough '2' divisers to make '10's. That's why we just count multiples of '5', multiples
// of '25' (5x5) that's one more diviser available, multiples of '125' (5x5x5) that's
// yet one more diviser available, and so on...
var trailingZeroes = function(n) {
    let count = 0;
    for(let i = 5; Math.floor(n/i) >= 1; i*= 5) {
        count += Math.floor(n/i);
    }
    return count;
};
