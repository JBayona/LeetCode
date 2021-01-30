/*
Given a string, we can "shift" each of its letter to its successive letter, for
example: "abc" -> "bcd". We can keep "shifting" which forms the sequence: 
"abc" -> "bcd" -> ... -> "xyz" Given a list of non-empty strings which contains only
lowercase alphabets, group all strings that belong to the same shifting sequence. 

Example: 
Input: ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"],
Output:  [   ["abc","bcd","xyz"],   ["az","ba"],   ["acef"],   ["a","z"] ]
https://leetcode.com/problems/group-shifted-strings/
*/

// Time O(N * M)
// Space O(N)
var groupShiftedStrings = function(list) {
    let groupShifted = {};

    for(let i = 0; i < list.length; i++) {
        let str = list[i];
        let shifted = getDiffStr(str);
        if(shifted in groupShifted) {
            groupShifted[shifted].push(str);
        } else {
            groupShifted[shifted] = [str]
        }
    }

    // Format the result
    let result = [];
    for(let prop in groupShifted) {
        result.push(groupShifted[prop]);
    }
    return result;
}

/*
Method to a difference string  for a given string. If string  is "adf" then difference
string will be "cb" (first difference 3 then difference 2) 
*/
function getDiffStr(str) {
    // Total lowercase letter 
    const ALPHA = 26
    let diff = 0;
    let shift = '';
    for(let i = 1; i < str.length; i++) {
        diff = str[i].charCodeAt(0) - str[i - 1].charCodeAt(0);

        // Make it circular
        if(diff < 0) {
            diff += ALPHA;
        }
        // Form the letter
        shift += String.fromCharCode((diff + 97) - 1); // 97 = a
    }
    return shift;
}

input = ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"];
console.log(groupShiftedStrings(input));
