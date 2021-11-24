""""
A word's generalized abbreviation can be constructed by taking any number of non-overlapping
substrings and replacing them with their respective lengths. For example, "abcde" can be abbreviated
into "a3e" ("bcd" turned into "3"), "1bcd1" ("a" and "e" both turned into "1"), and
"23" ("ab" turned into "2" and "cde" turned into "3").

Given a string word, return a list of all the possible generalized abbreviations of word. Return the answer in any order.

Example 1:
Input: word = "word"
Output: ["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]

Example 2:
Input: word = "a"
Output: ["1","a"]

https://leetcode.com/problems/generalized-abbreviation/
"""

"""""
We only have two paths:
1. If abbreviate: Update the current string with count, and reset count to 0.
2. If no abbreviate: We do not update the current string, increment the count to 0,
this string will be used later for the recursion calls with abbreviiation.
"""
def generateAbbreviations(word):
  if word is None:
    return []
  
  result = []
  helper(result, word, '', 0, 0)
  return result

def helper(result, s, current, index, count):
  # Base case
  if index == len(s):
    if count > 0:
      current += str(count)
      
    result.append(current)
  else:
    # Do not count the abbreviation
    helper(result, s, current, index + 1, count + 1)
    # Count the abbrevation
    tmp = str(count) + s[index] if count > 0 else s[index]
    helper(result, s, current + tmp, index + 1, 0)

word = "word"
# word = "a";
print(generateAbbreviations(word))