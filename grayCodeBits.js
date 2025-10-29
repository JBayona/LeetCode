/*
The gray code is a binary numeral system where two successive values differ in only one bit.

Given a non-negative integer n representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0.

Example 1:
Input: 2
Output: [0,1,3,2]
Explanation:
00 - 0
01 - 1
11 - 3
10 - 2

For a given n, a gray code sequence may not be uniquely defined.
For example, [0,2,3,1] is also a valid gray code sequence.

00 - 0
10 - 2
11 - 3
01 - 1

Example 2:
Input: 0
Output: [0]
Explanation: We define the gray code sequence to begin with 0.
             A gray code sequence of n has size = 2n, which for n = 0 the size is 20 = 1.
             Therefore, for n = 0 the gray code sequence is [0].

https://leetcode.com/problems/gray-code/
*/
// Time O(1)
// Space O(1)

/*
XOR, números iguales se hacen 0 y los diferentes 1

Para n = 0
00 ^ 00 -> 0
Para n = 1
01 ^ 00 -> 1
Para n = 2
10 ^ 01 -> 3
Para n = 3
11 ^ 01 -> 2
Para n = 4
100 ^ 010 -> 6 
*/
var grayCode = function(n) {
    let result = [];
    let size = Math.pow(2, n); // Number of elements in the array
    for(let i = 0; i < size; i++) {
        result.push(i ^ (i >> 1));
    }
    return result;
};
