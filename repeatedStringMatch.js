/*
Given two strings A and B, find the minimum number of times A has to be repeated such that B is a substring of it. If no such solution, return -1.

For example, with A = "abcd" and B = "cdabcdab".

Return 3, because by repeating A three times (“abcdabcdabcd”), B is a substring of it; and B is not a substring of A repeated two times ("abcdabcd").

https://leetcode.com/problems/repeated-string-match/
*/

var repeatedStringMatch = function(A, B) {
    // If we see B in A at the very beginning
    if(A.includes(B)) {
        return 1;
    }
    
    // Check if it's possible to get B from A
    let setA = new Set(A.split(''));
    let setB = new Set(B.split(''));
    
    if(setA.size !== setB.size)  {
        return -1;
    }
    
    setA.forEach((item) => {
        if(!setB.has(item)) {
            return -1;
        }
    });
    
    
    let tmp = '';
    let count = 0;
    // Repeat A until we have B
    while(tmp.length < B.length + 2 * A.length && tmp.indexOf(B) == -1 ){
        tmp += A;
        count++;
    }
    
    return tmp.indexOf(B) >= 0 ? count : -1;
};