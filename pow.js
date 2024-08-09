/*
Implement pow(x, n).

https://leetcode.com/problems/powx-n/description/
*/

// 1. If n is negative, we still have to continue the process that we would for a positive n, and simply divide the result by 1.
// 2. 2^10 is equivalent to (2^5) * (2^5). And (2^5) is equivalent to (2^2) * (2^2) * 2. Depending on whether n is odd or even.
// 3. So the problem can be continously divided. And results from one calculation, can simply be reused.
// 4. Finally, anything to the power of 0 is always 1. That is, if n is '0', the answer is '1'.


// Approach
// 1. If "n" is negative, convert it to positive to do normal calculations, at the end we can manipulate
// 2. Iterate and compute the result based on whether it's even/odd. If even, square the base and divide, if
// odd, multiply the result by "x" and decrement the exponent by 1. for example:
// x = 2, n = 3. Math.pow(2,3) = 8. Flow -> 3 (1 * 2) and decrement n (now 2) -> answer = 2 * (2 * 2)
// Time O(LogN)
var myPow = function(x, n) {
    let result = 1;
    let tmp = n;

    if (n < 0) {
        // Make it possitive
        tmp = tmp * -1;
    }

    while (tmp > 0) {
        // Even
        if (tmp % 2 === 0) {
            x *= x;
            tmp = Math.floor(tmp / 2);
        } else { // Odd
            result *= x;
            tmp--;
        }
    }
    return n < 0 ? 1 / result : result;
};

// Option 2
var myPow = function(x, n) {
    if (n < 0) {
        return 1 / power(x, n);
    }
    return power(x, n);
};

function power(x, n) {
    if (n === 0) {
        return 1;
    }
    var v = power(x, parseInt(n/2));
    // Even number (par)
    if (n % 2 === 0) {
        return v * v;
    }
    // Odd number (impar)
    return v * v * x;
}