/*
Given two integers a and b, return the sum of the two integers without using the operators + and -.

Example 1:
Input: a = 1, b = 2
Output: 3

Example 2:
Input: a = 2, b = 3
Output: 5

https://leetcode.com/problems/sum-of-two-integers/
*/

var getSum = function(a, b) {
    // fill arrays with correct amount of 1's or -1s
    const arrA = new Array(Math.abs(a)).fill(Math.sign(a) > 0 ? 1 : -1)
    const arrB = new Array(Math.abs(b)).fill(Math.sign(b) > 0 ? 1 : -1);
    
    // find biggest array for looping
    const biggest = arrA.length > arrB.length ? arrA : arrB;
	// array to hold our remainders when comparing each array item
    const output = [];
    for(let i = 0; i < biggest.length; i++) {
        // 0 + 1 <OR> 0 - 1
        if (!arrA[i] && arrB[i]) {
            output.push(arrB[i]);
        }
		// 1 + 0 <OR> -1 + 0
        if (arrA[i] && !arrB[i]) {
            output.push(arrA[i]);
        }
		// 1 + 1 <OR> -1 -1
        if (arrA[i] === arrB[i]) {
            output.push(arrA[i]);
            output.push(arrB[i]);
        }
    }
    // output will be array filled with either ALL -1's or ALL 1s
	// Length of output is the difference between a & b,
	// we just have to convert it to + or - sign and return it
    // Math.sign() returns either 1 or -1 depending of the sign
    return output.length ? Math.sign(output[0]) * output.length : 0;
};