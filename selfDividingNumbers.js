/*
A self-dividing number is a number that is divisible by every digit it contains.

For example, 128 is a self-dividing number because 128 % 1 == 0, 128 % 2 == 0, and 128 % 8 == 0.

Also, a self-dividing number is not allowed to contain the digit zero.

Given a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.
https://leetcode.com/problems/self-dividing-numbers/description/
*/

// Option 1

var selfDividingNumbers = function(left, right) {
    let result = [];
    let array;
    for(let i = left; i <= right; i++) {
        // Split the number
        if((''+i).split('').map(Number).every(digit => i%digit === 0 )) {
            result.push(i);
        }
    }
    return result;
};

// Option 2

var selfDividingNumbers = function(left, right) {
    let result = [];
    let array;
    for(let i = left; i <= right; i++) {
        // Split the number
        if(Array.from(''+i).map(Number).every(digit => i%digit ===0 )) {
            result.push(i);
        }
    }
    return result;
};

