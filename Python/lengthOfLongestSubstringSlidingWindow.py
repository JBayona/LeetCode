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
"""

class Solution:
    def lengthOfLongestSubstring(self, s):
        slow = 0
        fast = 0
        res = 0
        h = {}
        while fast < len(s):
            if s[fast] in h:
                h.pop(s[slow])
                slow += 1
            else:
                h[s[fast]] = True
                res = max(res, fast - slow + 1)
                fast += 1
        return res
    

obj = Solution()
print(obj.lengthOfLongestSubstring('abcabcbb'))