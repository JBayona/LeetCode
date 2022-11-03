"""
You are given an array of strings words. Each element of words consists of two lowercase English letters.

Create the longest possible palindrome by selecting some elements from words and concatenating them in any order.
Each element can be selected at most once.

Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.

A palindrome is a string that reads the same forward and backward.

Example 1:
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
Note that "clgglc" is another longest palindrome that can be created.

Example 2:
Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
Note that "lcyttycl" is another longest palindrome that can be created.

Example 3:
Input: words = ["cc","ll","xx"]
Output: 2
Explanation: One longest palindrome is "cc", of length 2.
Note that "ll" is another longest palindrome that can be created, and so is "xx".

https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words/description/
"""
from collections import Counter

class Solution:
    def longestPalindrome(self, words: List[str]) -> int:
        # Count the frequency of each word in words
        counter = Counter(words)

        result = 0
        for word in counter:
            reverse = ''.join(reversed(word))
            if reverse in counter:
                # Check for strings like aa, bb, cc
                if word == reverse:
                    if counter[word] % 2 == 0:
                        result += counter[word] * 2
                        counter[word] = 0
                    else:
                        # It´s odd so we take even numbers
                        # If we don't have pair numbers  we need to
                        # decrease the frequency - 1 cause
                        # We know we have one odd number, for example, for 3
                        # we count 2 and ignore 1
                        # for 5, we count 4 and we ignore 1, for 7, we count 6
                        # and we ignore 1
                        result += (counter[word] - 1) * 2
                        counter[word] = 1
                else:
                    # Normal string
                    minimum = min(counter[word], counter[reverse])
                    result += minimum * 4
                    counter[word] -= minimum
                    counter[reverse] -= minimum

        # Check for those in the middle of the sorted string, e.g aa, b
        for word in counter:
            if word[0] == word[1] and counter[word] > 0:
                result += 2
                # Only one left can be added
                break

        return result
