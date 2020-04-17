/*
Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.

If possible, output any possible result.  If not possible, return the empty string.

Example 1:

Input: S = "aab"
Output: "aba"
Example 2:

Input: S = "aaab"
Output: ""
Note:

S will consist of lowercase letters and have length in range [1, 500].

https://leetcode.com/problems/reorganize-string/
*/

// Time O(N)
// Space O(N)
var reorganizeString = function(S) {
    // Get the frequency map
    let map = {};
    for(let i = 0; i < S.length; i++) {
        if(S[i] in map) {
            map[S[i]]++;
        } else {
            map[S[i]] = 1;
        }
    }
    
    // Sort based on the frequency (only letters)
    let sortedArray = Object.keys(map).sort((a, b) => map[b] - map[a]);
    
    // If the max frequency have more that the half of the string, we would have at least one adjacent
    let maxElement = (S.length + 1) / 2;
    if(map[sortedArray[0]] > maxElement) {
        return '';
    }
    
    // Interleave characters
    let result = [];
    let position = 0;
    let index = 0;
    for(let i = 0; i < sortedArray.length; i++) {
        let char = sortedArray[i];
        let frequency = map[char];
        for(let j = 0; j < frequency; j++) {
            // Rewind pointer to 1 when we overflow odd indexes...
            // We don't have enough characters to overflow again
            if (position >= S.length) {
                position = 1;
            }
            result[position] = char;
            // First pass 2, 4, 6, 8, 10, 12
            // Second pass 1, 3, 5, 7, 9, 11
            position += 2;
        }
    }
    
    return result.join('');
};