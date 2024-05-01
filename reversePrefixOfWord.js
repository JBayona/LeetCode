/*
Given a 0-indexed string word and a character ch, reverse the segment of word that starts at
index 0 and ends at the index of the first occurrence of ch (inclusive). If the character ch
does not exist in word, do nothing.

For example, if word = "abcdefd" and ch = "d", then you should reverse the segment that starts
at 0 and ends at 3 (inclusive). The resulting string will be "dcbaefd".
Return the resulting string.

Example 1:
Input: word = "abcdefd", ch = "d"
Output: "dcbaefd"
Explanation: The first occurrence of "d" is at index 3. 
Reverse the part of word from 0 to 3 (inclusive), the resulting string is "dcbaefd".

Example 2:
Input: word = "xyxzxe", ch = "z"
Output: "zxyxxe"
Explanation: The first and only occurrence of "z" is at index 3.
Reverse the part of word from 0 to 3 (inclusive), the resulting string is "zxyxxe".

Example 3:
Input: word = "abcd", ch = "z"
Output: "abcd"
Explanation: "z" does not exist in word.
You should not do any reverse operation, the resulting string is "abcd".

https://leetcode.com/problems/reverse-prefix-of-word/description/?envType=daily-question&envId=2024-05-01
*/

var reversePrefix = function (word, ch) {
  for (let i = 0; i < word.length; i++) {
    let c = word[i];
    if (c === ch) {
      return reverseWords(i, word);
    }
  }
  // No match found
  return word;
};

function reverseWords(index, word) {
  let start = 0;
  let end = index;
  let result = word.split("");
  while (start < end) {
    let tmp = result[start];
    result[start] = result[end];
    result[end] = tmp;
    start++;
    end--;
  }
  return result.join("");
}

// Option 2
var reversePrefix = function (word, ch) {
  word.split("");
  let i = word.indexOf(ch);
  return (
    word
      .slice(0, i + 1)
      .split("")
      .reverse()
      .join("") + word.slice(i + 1)
  );
};

// Option 3
var reversePrefix = function (word, ch) {
  let left = 0;
  let right = word.indexOf(ch);

  if (right === -1) return word;

  word = word.split("");
  while (left <= right) {
    [word[left], word[right]] = [word[right], word[left]];
    left++;
    right--;
  }
  return word.join("");
};
