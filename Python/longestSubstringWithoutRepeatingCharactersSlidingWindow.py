"""
Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Example 4:
Input: s = ""
Output: 0

https://leetcode.com/problems/longest-substring-without-repeating-characters/
"""

class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        start = 0
        end = 0
        result = 0
        seen = {}
        while end < len(s):
            c = s[end]
            # Repetitive, move left window
            if c in seen:
                left = s[start]
                del seen[left]
                start += 1
            else:
                seen[c] = 1
                result = max(end - start + 1, result)
                end += 1
        return result