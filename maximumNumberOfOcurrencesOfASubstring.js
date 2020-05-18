/*
Given a string s, return the maximum number of ocurrences of any substring under the following rules:

The number of unique characters in the substring must be less than or equal to maxLetters.
The substring size must be between minSize and maxSize inclusive.
 

Example 1:

Input: s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
Output: 2
Explanation: Substring "aab" has 2 ocurrences in the original string.
It satisfies the conditions, 2 unique letters and size 3 (between minSize and maxSize).
Example 2:

Input: s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3
Output: 2
Explanation: Substring "aaa" occur 2 times in the string. It can overlap.
Example 3:

Input: s = "aabcabcab", maxLetters = 2, minSize = 2, maxSize = 3
Output: 3
Example 4:

Input: s = "abcde", maxLetters = 2, minSize = 3, maxSize = 3
Output: 0

https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring/
*/

var maxFreq = function(s, maxLetters, minSize, maxSize) {
    let array = s.split('');
    let letterCount = {};
    let map = {}; // Count specific string to satisfy the requirement
    let start = 0;
    let end = start + minSize - 1;
    let letterTotal = 0;
    let answer = 0;
    
    for(let i = start; i <= end; i++) {
        let item = array[i];
        if(item in letterCount) {
            letterCount[item]++;
        } else {
            letterTotal++; // New letter
            letterCount[item] = 1;
        }
    }
    
    if(letterTotal <= maxLetters) {
        let tmp = s.substring(start, end + 1);
        console.log(tmp);
        map[tmp] = 1; // {aab: 1}
        answer = 1;
    }
    
    // Slide window and check if the substring in the window satisfies the requirement
    // Increase one char from start and one from end
    end++;
    while(end < s.length) {
        let c = array[end];
        // Increment window
        if(c in letterCount) {
            letterCount[c]++;
        } else {
            letterTotal++;
            letterCount[c] = 1;
        }
        
        // Decrement window
        c = array[start];
        if(letterCount[c] === 1) {
            letterTotal--;
            delete letterCount[c];
        } else {
            letterCount[c]--;
        }
        start++;
        if(letterTotal <= maxLetters) {
            let current = s.substring(start, end + 1);
            if(current in map) {
                map[current]++;
            } else {
                map[current] = 1;
            }
            answer = Math.max(map[current], answer);
        }
        end++;
    }
    return answer;
};