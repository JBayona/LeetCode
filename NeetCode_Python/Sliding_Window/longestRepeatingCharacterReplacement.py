# You are given a string s and an integer k. You can choose any character of the string
# and change it to any other uppercase English character. You can perform this operation at most k times.

# Return the length of the longest substring containing the same letter you can
# get after performing the above operations.

# Example 1:
# Input: s = "ABAB", k = 2
# Output: 4
# Explanation: Replace the two 'A's with two 'B's or vice versa.

# Example 2:
# Input: s = "AABABBA", k = 1
# Output: 4
# Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
# The substring "BBBB" has the longest repeating letters, which is 4.
# There may exists other ways to achieve this answer too.

# https://leetcode.com/problems/longest-repeating-character-replacement/description/


from collections import Counter

# Time O(N)
# Space O(N)


class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        start = 0
        end = 0
        hash = {}
        max_element = 0
        result = 0

        while end < len(s):
            c = s[end]
            # Track the count of all elements
            if c not in hash:
                hash[c] = 0

            hash[c] += 1
            # Get the maximum occurence of the current window
            max_element = max(max_element, hash[c])
            # Check if we can maximize the window based on the K constraint
            letters_to_change = (end - start + 1) - max_element
            # If we are out of the window, we need to move the left pointer
            if letters_to_change > k:
                l = s[start]
                hash[l] -= 1
                start += 1

            # Try to maximize the result
            result = max(result, end - start + 1)
            end += 1
        return result
