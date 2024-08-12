/*
Objective: Given a number, find out whether its colorful or not.

Colorful Number: When in a given number, product of every digit of a sub-sequence are different. That number is called Colorful Number. See Example

Example:

Given Number : 3245
Output : Colorful

Number 3245 can be broken into parts like 3 2 4 5 32 24 45 324 245.
this number is a colorful number, since product of every digit of a sub-sequence are different.
That is, 3 2 4 5 (3*2)=6 (2*4)=8 (4*5)=20, (3*2*4)= 24 (2*4*5)= 40

Given Number : 326
Output : Not Colorful.

326 is not a colorful number as it generates 3 2 6 (3*2)=6 (2*6)=12.

https://tutorialhorizon.com/algorithms/colorful-numbers/
*/
function colorfulNumbers(number) {
    let seen = new Set();
    // Get all subsequence subarrays
    for (let i = 1; i < number.length; i++) {
        for (let j = 0; j + i <= number.length; j++) {
            let n = number.substring(j, i + j);
            let product = getProduct(Number(n));
            if (seen.has(product)) {
                return false;
            }
            seen.add(product);
        }
    }
    return true;
}

// Get the product of all digits
function getProduct(n) {
    let result = 1;
    while (n){
        result *= (n % 10); // | 0 means floor
        n = Math.floor(n / 10);
    }
    return result;
}

n = '326'; // false
n = '3245'; // true
console.log(colorfulNumbers(n));