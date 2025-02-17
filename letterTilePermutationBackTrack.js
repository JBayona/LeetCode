/*
You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

Example 1:
Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

Example 2:
Input: tiles = "AAABBC"
Output: 188

Example 3:
Input: tiles = "V"
Output: 1

https://leetcode.com/problems/letter-tile-possibilities
*/

// Backtrack
// Time O(n!)
/*
               A2B1
       A1B1.         A2B0
   A0B1.  A1B0.      A1B0
   A0B0.  A0B0       A0B0
*/
var numTilePossibilities = function (tiles) {
  let hash = {};
  for (let i = 0; i < tiles.length; i++) {
    let c = tiles[i];
    if (!(c in hash)) {
      hash[c] = 0;
    }
    hash[c]++;
  }
  return helper(hash);
};

// Backtrack
function helper(map) {
  let sum = 0;
  for (let prop in map) {
    let key = prop;
    let val = map[key];
    // No need to check for this char
    // Check the next one
    if (val === 0) {
      continue;
    }
    sum++;
    map[key]--;
    sum += helper(map);
    map[key]++;
  }
  return sum;
}
