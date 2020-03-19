/*
Input: s = "aaaabbbbcccc"
Output: "abccbaabccba"
Explanation: After steps 1, 2 and 3 of the first iteration, result = "abc"
After steps 4, 5 and 6 of the first iteration, result = "abccba"
First iteration is done. Now s = "aabbcc" and we go back to step 1
After steps 1, 2 and 3 of the second iteration, result = "abccbaabc"
After steps 4, 5 and 6 of the second iteration, result = "abccbaabccba"
Example 2:

Input: s = "rat"
Output: "art"
Explanation: The word "rat" becomes "art" after re-ordering it with the mentioned algorithm.
Example 3:

Input: s = "leetcode"
Output: "cdelotee"
Example 4:

Input: s = "ggggggg"
Output: "ggggggg"
Example 5:

Input: s = "spo"
Output: "ops"

https://leetcode.com/problems/increasing-decreasing-string/
*/

var sortString = function(s) {
    let array = new Array(26).fill(0);
    let result = {val: ''}
    
    // Count characters
    for(let i = 0; i < s.length; i++) {
        array[s[i].charCodeAt(0) - 97]++;
    }
    
    let isFound = true;
    while(isFound) {
        // Look forward
        isFound =  lookIncreasing(array, result);
        // Look backwards
        isFound = lookDecreasing(array, result);
    }
    
    return result.val
};


function lookIncreasing(array, result) {
    let found = false;
    for(let i = 0; i < array.length; i++)  {
        if(array[i]) {
            found = true;
            result.val += String.fromCharCode(i + 97);
            array[i]--;
        }
    }
    return found;
}

function lookDecreasing(array, result) {
    let found = false;
    for(let i = array.length - 1; i >= 0; i--)  {
        if(array[i]) {
            found = true;
            result.val += String.fromCharCode(i + 97);
            array[i]--;
        }
    }
    return found;
}