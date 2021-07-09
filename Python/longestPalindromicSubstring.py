"""
Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Example 3:
Input: s = "a"
Output: "a"

Example 4:
Input: s = "ac"
Output: "a"

https://leetcode.com/problems/longest-palindromic-substring/
"""

# O(N^2)
class Solution(object):
    def get_longest_palindrome(self, l, r, s):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return [l+1,r]
    
    def longestPalindrome(self, s):                   
        result = ''
        longest = [0,0]
        for i in range(len(s)):
            even = self.get_longest_palindrome(i, i, s)
            odd = self.get_longest_palindrome(i, i+1, s)
            print('new', even, odd)
            # Get the max difference between the first and las element from
            # the arrays
            maximum = max(odd, even, key=lambda x: x[1]-x[0])
            # Get the max difference between the substrings to get indexs
            longest = max(longest, maximum, key=lambda x: x[1]-x[0])
        return s[longest[0]: longest[1]]