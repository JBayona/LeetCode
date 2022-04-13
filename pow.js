/*
Implement pow(x, n).

https://leetcode.com/problems/powx-n/description/
*/

// 1. If n is negative, we still have to continue the process that we would for a positive n, and simply divide the result by 1.
// 2. 2^10 is equivalent to (2^5) * (2^5). And (2^5) is equivalent to (2^2) * (2^2) * 2. Depending on whether n is odd or even.
// 3. So the problem can be continously divided. And results from one calculation, can simply be reused.
// 4. Finally, anything to the power of 0 is always 1. That is, if n is '0', the answer is '1'.
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