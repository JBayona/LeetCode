/*
Objective: Given a number, get all its subsequence, example

Given Number : 3245
Output : 3 2 4 5 32 24 45 324 245
*/
function colorfulNumbers(number) {
    // Get all subsequence subarrays
    for (let i = 1; i < number.length; i++) {
        for (let j = 0; j + i <= number.length; j++) {
            let n = number.substring(j, i + j);
            console.log(n);
        }
    }
}


n = '3245';
console.log(colorfulNumbers(n));