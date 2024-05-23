/*
Given a string s, partition s such that every substring of the partition is a palindrome.
Return all possible palindrome partitioning of s.
Example:
Input: "aab"
Output:
[
  ["aa","b"],
  ["a","a","b"]
]
https://leetcode.com/problems/palindrome-partitioning/
*/
// Time O(n^2)
var partition = function(s) {
    let result = [];
    findPossiblePalindrome(s, result, [], 0);
    return result;
};

const findPossiblePalindrome = (str, result, tmp, index) => {
    // Means we have reached the end of the string and it's a valid answer
    if(index === str.length) {
        // tmp has all the cuts we are getting with the combinations
        result.push([...tmp]);
        return;
    }
    // Check all the possible options
    for(let i = index; i < str.length; i++) {
        // Verify if the string is a palindrome starting from index to all
        // the characters from the string
        if(isPalindrome(str, index, i)) {
            // If it's a palindrome, add it to tmp and check all possible combinations
            // taking the next character of the string
            tmp.push(str.substring(index, i + 1));
            findPossiblePalindrome(str, result, tmp, i + 1);
            // Remove the string that we already check in our combinations
            tmp.pop();
        }
    }
}

const isPalindrome = (str, indexA, indexB) => {
    while(indexA <= indexB) {
        if(str[indexA] === str[indexB]) {
            indexA++;
            indexB--;
        } else {
            return false;
        }
    }
    return true;
}

let str = "aab";
console.log(partition(str));
