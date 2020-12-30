/*
Given a string s , find the length of the longest substring t  that contains at most 2 distinct characters.

Example 1:

Input: "eceba"
Output: 3
Explanation: t is "ece" which its length is 3.
Example 2:

Input: "ccaabbb"
Output: 5
Explanation: t is "aabbb" which its length is 5.
*/

function lengthOfLongestSubstringTwoDistinct(str) {
  if(!str) {
    return "";
  }
  let left = 0;
  let right = 0;
  let max = 0;
  let map = {};
  while(right < str.length) {
    // We need to move the window.
    if(Object.keys(map).length === 3) {
      while(Object.keys(map).length === 3) {
        let c = str.charAt(left);
        let count = map[c];
        if(count === 1) {
          delete map[c];
        } else {
          map[c]--;
        }
        left++;
      }
    } else {
      let c = str.charAt(right);
      if(c in map) {
        map[c]++;
      } else {
        map[c] = 1;
      } 
      right++;
    }
    if(Object.keys(map).length <= 2) {
      if(right - left > max) {
        max = Math.max(max, right - left);
      }
    }
  }
  return max;
}

class Solution {
    /*
        Time: O(n)
        Space: O(n)
    */
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        if(s == null || s.length() == 0) {
           return 0;
        }
        Map<Character, Integer> map = new HashMap<>();
        int right = 0;
        int left = 0;
        int longestSubString = 0;
        while(right < s.length()) {
            if(map.size() == 3) {
                while(map.size() == 3) {
                    char c = s.charAt(left);
                    Integer count = map.get(c);
                    if(count == 1) {
                        map.remove(c);
                    } else {
                        map.put(c, count - 1);
                    }
                    left++;
                }
            } else {
                char c = s.charAt(right);
                map.put(c, map.getOrDefault(c, 0) + 1);
                right++;
            }
            if(map.size() <= 2) {
                if(right - left > longestSubString) {
                    longestSubString = right - left;
                }
            }
        }
        return longestSubString;
    }
}