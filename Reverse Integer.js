/*
Reverse digits of an integer.

Example1: x = 123, return 321
Example2: x = -123, return -321
*/


var reverse = function(x) {
    var isNegative = x < 0 ? true: false;
    var result = 0;
    
    if (isNegative) {
        x = x * (-1);
    }
    
    while (x !== 0) {
        result = result * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    if (result >= 2147483648) {
        return 0;
    }
    
    return isNegative ? result * (-1) : result;
};

number = 123;
console.log(reverse(number)); 