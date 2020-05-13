/*
Given two strings s1 and s2, write a function to return true if s2 contains
the permutation of s1. In other words, one of the first string's permutations is the substring of the second string.

Example 1:

Input: s1 = "ab" s2 = "eidbaooo"
Output: True
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input:s1= "ab" s2 = "eidboaoo"
Output: False

https://leetcode.com/problems/permutation-in-string/
*/

// O(N) where N is the length of s1
var checkInclusion = function(s1, s2) {
    let map = {};
    
    // Count the frequency of the s1
    for(let i = 0; i < s1.length; i++) {
        let item = s1[i];
        if(item in map) {
            map[item]++;
        } else {
            map[item] = 1;
        }
    }
    
    // window size using the s1 lengt
    let left = 0;
    let right = 0;
    // These are the number we need to match
    let count = Object.keys(map).length;
    // Traverse over the whole s2 string
    while(right < s2.length) {
        // Get the right element
        let c = s2[right];
        right++;
        // If that char is in the map, it means we have it as part of s1
        if(c in map) {
            // We decrement the count we have in the map as we already saw the element
            map[c]--;
            // If we reached 0 it means what we already saw the characters, then decrease
            // the count of the numbers we want as we already satisfy the characters
            if(map[c] === 0) {
                count--;
            }
        }
        // Check the length of the window
        if(right - left === s1.length) {
            // If count is 0,it means we have found the characters
            if(count === 0) {
                return true;
            }
            // Get the left character
            c = s2[left];
            // Increment the left window
            left++;
            // If the character is part of the s1 string
            if(c in map) {
                // If we already set the counter to 0, increment as we need to find the element
                if(map[c] === 0) {
                    count++;
                }
                // Increase the count of frequency
                map[c]++;
            }
        }
    }
    return false;
};


class Solution {
    /*
        Where n is the length of s2 and m the length of s1
        Time: O(n*m)
        Space: O(n+m)
    */
    public boolean checkInclusion(String s1, String s2) {
        if(s1 == null || s2 == null
           || (s1.isEmpty() && s2.isEmpty())
           || s1.length() > s2.length()) {
            return false;
        }
        Map<Character, Integer> map1 = new HashMap<>();
        for(char c : s1.toCharArray()) {
            map1.put(c, map1.getOrDefault(c, 0) + 1);
        }
        Map<Character, Integer> map2 = null;
        for(int i = 0; i < s2.length() - s1.length() + 1; i++) {
            map2 = new HashMap<>();
            for(int j = i; j < i + s1.length(); j++) {
                char c = s2.charAt(j);
                map2.put(c, map2.getOrDefault(c, 0) + 1);
            }
            if(map1.equals(map2)) {
                return true;
            }
        }
        return false;
    }
}



class Solution {
    /*
        Where n is the length of s2 and m the length of s1
        Time: O(n*m)
        Space: O(n+m)
    */
    public boolean checkInclusion(String s1, String s2) {
        if(s1 == null || s2 == null
           || (s1.isEmpty() && s2.isEmpty())
           || s1.length() > s2.length()) {
            return false;
        }
        Map<Character, Integer> map1 = new HashMap<>();
        Map<Character, Integer> map2 = new HashMap<>();
        for(int i = 0; i < s1.length(); i++) {
            char c = s2.charAt(i);
            map2.put(c, map2.getOrDefault(c, 0) + 1);
            c = s1.charAt(i);
            map1.put(c, map1.getOrDefault(c, 0) + 1);
        }
        if(map1.equals(map2)) {
            return true;
        }
        int lastIndex = 0;
        for(int i = s1.length(); i < s2.length(); i++) {
            char c = s2.charAt(lastIndex);
            // remove
            Integer count = map2.get(c);
            if(count == 1) {
               map2.remove(c);
            } else {
                map2.put(c, count - 1);
            }
            c = s2.charAt(i);
            map2.put(c, map2.getOrDefault(c, 0) + 1);
            if(map1.equals(map2)) {
                return true;
            }
            lastIndex++;
        }
        return false;
    }
}