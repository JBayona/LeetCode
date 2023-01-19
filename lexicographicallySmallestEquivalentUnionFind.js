/*
You are given two strings of the same length s1 and s2 and a string baseStr.

We say s1[i] and s2[i] are equivalent characters.
For example, if s1 = "abc" and s2 = "cde", then we have 'a' == 'c', 'b' == 'd', and 'c' == 'e'.
Equivalent characters follow the usual rules of any equivalence relation:

Reflexivity: 'a' == 'a'.
Symmetry: 'a' == 'b' implies 'b' == 'a'.
Transitivity: 'a' == 'b' and 'b' == 'c' implies 'a' == 'c'.
For example, given the equivalency information from s1 = "abc" and s2 = "cde", "acd" and "aab"
are equivalent strings of baseStr = "eed", and "aab" is the lexicographically smallest equivalent string of baseStr.

Return the lexicographically smallest equivalent string of baseStr by using the equivalency information from s1 and s2.

Example 1:
Input: s1 = "parker", s2 = "morris", baseStr = "parser"
Output: "makkek"

Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [m,p], [a,o], [k,r,s], [e,i].
The characters in each group are equivalent and sorted in lexicographical order.
So the answer is "makkek".

https://leetcode.com/problems/lexicographically-smallest-equivalent-string/description/
*/

// Time Complexity: O(n Log n)
// Space Complexity: O(m + n) where m = s1.length and n = s2.length
var smallestEquivalentString = function (s1, s2, baseStr) {
  let parent = {};
  let tam = s1.length;
  // Set init parents to its own
  for (let i = 0; i < tam; i++) {
    let parentA = s1[i];
    let parentB = s2[i];

    // Set root to all nodes
    // s1 = "parker", s2 = "morris"
    // {p:p, a:a, r:r, k:k, e:e, r:r, m:m, o:o, i:i, s:s}
    if (!(parentA in parent)) {
      parent[parentA] = parentA;
    }
    if (!(parentB in parent)) {
      parent[parentB] = parentB;
    }
  }

  // S1 is the same size as S2
  for (let i = 0; i < tam; i++) {
    let parentA = findParent(s1[i], parent);
    let parentB = findParent(s2[i], parent);
    union(parentA, parentB, parent);
  }

  // Format the result
  let result = "";
  for (let i = 0; i < baseStr.length; i++) {
    // If the letter of baseStr is not present
    // we need to use it as base result
    let c = baseStr[i];
    // Each key in the parent has its connection so we need to find
    // the parent key until we find the lexicographically smallest characteer
    if (c in parent) {
      result += findParent(parent[c], parent);
    } else {
      result += c;
    }
  }
  return result;
};

// Find the current parent
function findParent(node, parent) {
  if (parent[node] === node) {
    return node;
  }
  return findParent(parent[node], parent);
}

function union(nodeA, nodeB, parent) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);
  // If parentA is lexicographical smaller, we set is as parent
  if (parentA < parentB) {
    parent[parentB] = parentA;
  } else {
    // Otherwise parentB is smaller, we set parentB.
    parent[parentA] = parentB;
  }
}
