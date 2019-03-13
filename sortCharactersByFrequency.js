/*
Given a string, sort it in decreasing order based on the frequency of characters.

Example 1:

Input:
"tree"

Output:
"eert"

Explanation:
'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
Example 2:

Input:
"cccaaa"

Output:
"cccaaa"

Explanation:
Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
Note that "cacaca" is incorrect, as the same characters must be together.
Example 3:

Input:
"Aabb"

Output:
"bbAa"

Explanation:
"bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.

https://leetcode.com/problems/sort-characters-by-frequency/

*/

var frequencySort = function(s) {
    let hash = {};
    let array = [];
    let result = '';
    
    // Count frequency
    for(let i = 0; i < s.length; i++) {
        if(s[i] in hash) { 
            hash[s[i]]++;
        } else {
            hash[s[i]] = 1;
        }
    }
    
    // Add objects into an array so we can sort it
    for(let letter in hash) {
        array.push({letter: letter, frequency: hash[letter]});
    }
    
    // Sort the array using the frequency criteria
    array.sort((a,b) => b.frequency - a.frequency);
    
    // Get the final resilt
    for(let i = 0; i < array.length; i++) {
        result += array[i].letter.repeat(array[i].frequency);
    }
    
    return result;
};