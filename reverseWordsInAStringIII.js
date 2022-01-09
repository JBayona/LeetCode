/*
Given a string s, reverse the order of characters in each word within a sentence
while still preserving whitespace and initial word order.
Example 1:
Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"

Example 2:
Input: s = "God Ding"
Output: "doG gniD"

https://leetcode.com/problems/reverse-words-in-a-string-iii/
*/

// Time O(N)
// Space O(N)
var reverseWords = function(s) {
    let words = s.split(' ');
    for(let i = 0; i < words.length; i++) {
        words[i] = reverse(words[i]);
    }
    return words.join(' ');
};

const reverse = word => {
    let left = 0;
    let right = word.length - 1;
    let s = word.split('');
    while(left < right) {
        let tmp = s[left];
        s[left] = s[right];
        s[right] = tmp;
        left++;
        right--;
    }
    return s.join('');
}
