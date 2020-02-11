/*
ind the length of the longest substring T of a given string (consists of lowercase letters only) such that
every character in T appears no less than k times.

Example 1:

Input:
s = "aaabb", k = 3

Output:
3

The longest substring is "aaa", as 'a' is repeated 3 times.
Example 2:

Input:
s = "ababbc", k = 2

Output:
5

The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.

https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/
*/

// Divide and conquer approach
var longestSubstring = function(s, k) {
    return search(s,k);
};

function search(s, k) {
    // Base case
    //If the string can not be split anymore
    if(s.length < k) {
        return 0;
    }

    // Count the frecuency of the map
    let map = {};
    for(let i = 0; i < s.length; i++) {
        map[s[i]] = map[s[i]] ? map[s[i]] + 1 : 1;
    }

    for(let prop in map) {
        // If the count is  less than k, let's divide the string
        if(map[prop] < k) {
            let char_index = s.indexOf(prop);
            let first_half = search(s.substring(0, char_index), k);
            let second_half = search(s.substring(char_index + 1), k); 
            return Math.max(first_half, second_half);
        }
    }
    // Return the entire string
    return  s.length;
}

s = "weitong";
k = 2;
console.log(longestSubstring(s,k))