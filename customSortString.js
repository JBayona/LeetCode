/*
S and T are strings composed of lowercase letters. In S, no letter occurs more than once.

S was sorted in some custom order previously. We want to permute the characters of T so that they match the order that S was sorted. More specifically, if x occurs before y in S, then x should occur before y in the returned string.

Return any permutation of T (as a string) that satisfies this property.

Example :
Input: 
S = "cba"
T = "abcd"
Output: "cbad"
Explanation: 
"a", "b", "c" appear in S, so the order of "a", "b", "c" should be "c", "b", and "a". 
Since "d" does not appear in S, it can be at any position in T. "dcba", "cdba", "cbda" are also valid outputs.
 

Note:

S has length at most 26, and no character is repeated in S.
T has length at most 200.
S and T consist of lowercase letters only.

https://leetcode.com/problems/custom-sort-string/
*/

var customSortString = function(S, T) {
    let hashmap = getHashCount(T);
    let result = '';
    
    let s_array = S.split('');
    for(let i = 0; i < s_array.length; i++) {
        let letter = s_array[i];
        if(letter in hashmap) {
            result += letter.repeat(hashmap[letter]);
            delete hashmap[letter];
        }
    }
    
    // Concat las missing letters
    for(let prop in hashmap) {
        result += prop.repeat(hashmap[prop]);
    }
    
    return result;
    
};

function getHashCount(T) {
    let hash = {};
    
    let array = T.split('');
    for(let i = 0; i < array.length; i++) {
        let letter = array[i];
        if(letter in hash) {
            hash[letter]++;
        } else {
            hash[letter] = 1;
        }
    }
    return hash;
}