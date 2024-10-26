/*
Given two set, determine if they're exactly the same without using a
built in function. The keys can either be strings or sets.

Example:
Input:
set1 = {a, {b, {c}}}  set2 = {{{c}, b}, a}
Output: true

Input:
set1 = {a, {b, c}} set2 = {a, {b, {c}}}
Output: false
*/

function compareSet(s1, s2) {
  let map1 = findDepth(s1);
  let map2 = findDepth(s2);
  // Compare if they are the same
  for (let prop in map1) {
    // If the property does not exist, it's not the same
    if (!(prop in map2)) {
      return false;
    }
    // If the level is not the same, it's not the same
    if (map1[prop] !== map2[prop]) {
      return false;
    }
  }
  return true;
}

function findDepth(set) {
  let map = {};
  let level = 0;
  helper(set, level, map);
  return map;
}

function helper(set, level, map) {
  for (elem of set) {
    if (typeof elem === "string") {
      map[elem] = level;
    } else {
      helper(elem, level + 1, map);
    }
  }
}

// let s1 = new Set(['a', new Set(['b', new Set(['c'])])]);
// let s2 = new Set(['a', new Set(['b', new Set(['c'])])]); // true

let s1 = new Set(["a", new Set(["b", "c"])]);
let s2 = new Set(["a", new Set(["b", new Set(["c"])])]); // false
console.log(compareSet(s1, s2));
