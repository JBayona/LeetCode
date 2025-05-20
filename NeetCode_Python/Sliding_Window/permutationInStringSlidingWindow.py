# Given two strings s1 and s2, return true if s2 contains
# a permutation of s1, or false otherwise.

# In other words, return true if one of s1's permutations is the substring of s2.
# Example 1:

# Input: s1 = "ab", s2 = "eidbaooo"
# Output: true
# Explanation: s2 contains one permutation of s1 ("ba").

# Example 2:
# Input: s1 = "ab", s2 = "eidboaoo"
# Output: false

# https://leetcode.com/problems/permutation-in-string/description/

class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        start = 0
        end = 0
        hash = {}

        # Track the recurrence of s1
        for c in s1:
            if c not in hash:
                hash[c] = 0
            hash[c] += 1

        # Get the count of the keys in the hash
        count = len(hash)
        while end < len(s2):
            c = s2[end]
            if c in hash:
                hash[c] -= 1
                # Whenever the elements are zero count, we know that
                # one element has been already counted
                if hash[c] == 0:
                    count -= 1

            # If the window is the same as the s1, it means that the
            # window is eligible
            while end - start + 1 == len(s1):
                # If the count is zero, we have found the permutation
                if count == 0:
                    return True

                # Move the window to the left to look for
                # more options
                l = s2[start]
                start += 1

                if l in hash:
                    # Put back the count if the left window was covering
                    # elements from s1
                    if hash[l] == 0:
                        count += 1

                    hash[l] += 1

            end += 1
        return False
