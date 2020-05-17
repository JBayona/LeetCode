/*
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

https://leetcode.com/problems/longest-substring-without-repeating-characters/

// Sliding window pattern
https://leetcode.com/problems/find-all-anagrams-in-a-string/discuss/92007/sliding-window-algorithm-template-to-solve-all-the-leetcode-substring-search-problem

*/

// Sliding Window
/*
Sliding window, si no encontramos repetimos, avanzamos el tail del windows, si encontramos un
repetido, avanzamos el head del window
*/
var lengthOfLongestSubstring = function(s) {
  let start = 0;
  let end = 0;
  let map = {};
  let result = 0;
  // Counter es la variable que usamos para contar los repetidos
  let counter = 0;
    
  while(end < s.length) {
    let current = s[end];
    // Si tenemos un repetido, contamos repetidos
    if(current in map) {
      map[current]++;
      // Si es mayor a uno significa que tenemos repetidos
      if(map[current] > 1) {
        counter++;
      }
    } else {
      map[current] = 1;
    }
    
    // Si tenemos repetidos debemos avanzar el head del window
    while(counter > 0) {
      let head = s[start];
      // Significa que este char es repetido, debemos recorrerlo
      if(map[head] > 1) {
        // Decrementamos counter como hemos eliminado uno de nuestros objetivos de la ventaba
        counter--;
      }
      // Esto elimina los elementos de nuestro map que ya analizamos, evita inconsistencias
      map[head]--;
      // Increase the window from head
      start++;
    }
    // Encrease window from tail
    end++;
      
    result = Math.max(result, end - start);
  }
  return result;
};

str = "tmmzuxt";
console.log(lengthOfLongestSubstring(str));