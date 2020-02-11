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

// Option 2
/*
Divide and conquer method：

1. Scan given string and count the frequency of every character.
2. If frequency of character s[i] is less than k,that means s[i] is not a part of
every “Substring with At Least K Repeating Characters”.Return Math.max(divide(start, i - 1), divide(i + 1, end))
3. If frequency of every character is not less than k, return the length of that string.
4. Line4: if (end - start + 1 < k) return 0. Will save a lot of time. Give it a try with comment it.
*/
var longestSubstring = function (s, k) {
    
    function divide(start, end) {
        if (end - start + 1 < k) return 0   // without this line will be much slower, give it a try.
        if (start > end) return 0

        const count = {}

        // count the frequency
        for (let i = start; i <= end; i++) {
            count[s[i]] = count[s[i]] ? count[s[i]] + 1 : 1
        }

        // reduce the length of string 
        while (end - start + 1 >= k && count[s[start]] < k)
            start++
        while (end - start + 1 >= k && count[s[end]] < k)
            end--
        if (end - start + 1 < k) return 0

        // divede at i: count[s[i]] < k
        for (let i = start; i <= end; i++) {
            if (count[s[i]] < k) {
                return Math.max(divide(start, i - 1), divide(i + 1, end))
            }
        }

        // find a Substring with At Least K Repeating Characters
        return end - start + 1
    }

    return divide(0, s.length - 1)
}

s = "weitong";
k = 2;
console.log(longestSubstring(s,k))