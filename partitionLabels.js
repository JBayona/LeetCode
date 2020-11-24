/*
A string S of lowercase English letters is given. We want to partition this string into as many
parts as possible so that each letter appears in at most one part, and return a list of integers
representing the size of these parts.

Example 1:
Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]

Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

https://leetcode.com/problems/partition-labels/
https://www.youtube.com/watch?v=ED4ateJu86I
*/

// Pre-compute first.
var partitionLabels = function(s) {
  let result = [];
  let lastIndexes = new Array(26).fill(0);
  for(let i = 0; i < s.length; i++) {
      let c = s[i];
      // Track the last index for every letter
      lastIndexes[c.charCodeAt(0) - 97] = i; // 97 is A
  }
  /*
  Para particionar el string, sabemos el que caracter que tenemos
  en el momento debe de estar en la misma string, es por eso que
  como máximo el string debe de ser en donde encontramos el último
  caracter, el caso curioso es que si uno de los caracteres de en
  medio tiene una aparición después del último caracter de los ya
  analizados, en ese caso, prolongamos o extendemos el end, que es
  lo que hacemos en el while. Al final sólo lo agregamos al resultado
  y movemos el pointer a la posición del último caracter.
  */
  let idx = 0;
  while(idx < s.length) {
      let end = lastIndexes[s.charCodeAt(idx) - 97];
      let i = idx;
      while(i !== end) {
          end = Math.max(end, lastIndexes[s.charCodeAt(i++) - 97]);
      }
      result.push(i - idx + 1);
      idx = i + 1;
  }
  return result;
};
