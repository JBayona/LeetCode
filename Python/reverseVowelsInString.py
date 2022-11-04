"""
Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

Example 1:
Input: s = "hello"
Output: "holle"

Example 2:
Input: s = "leetcode"
Output: "leotcede"

https://leetcode.com/problems/reverse-vowels-of-a-string/description/
"""


class Solution:
    def reverseVowels(self, s: str) -> str:
        vowels = ['a', 'e', 'i', 'o', 'u']
        # Convert s to list
        s = list(s)
        start = 0
        end = len(s)-1

        while start < end:
            if s[start].lower() in vowels and s[end].lower() in vowels:
                s[start], s[end] = s[end], s[start]
                start += 1
                end -= 1
            elif s[start].lower() not in vowels:
                start += 1
            else:
                end -= 1

        return''.join(s)
