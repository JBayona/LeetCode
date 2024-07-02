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
var smallestEquivalentString = function(s1, s2, baseStr) {
  let len = s1.length;
  let parent = {};
  // Set init parent to its own
  for (let i = 0; i < len; i++) {
      let parentA = s1[i];
      let parentB = s2[i];

      if (!(parentA in parent)) {
          parent[parentA] = parentA;
      }
      if (!(parentB in parent)) {
          parent[parentB] = parentB;
      }
  }

  for (let i = 0; i < len; i++) {
      let parentA = findParent(s1[i], parent);
      let parentB = findParent(s2[i], parent);

      // As both are equivalen, apply union
      // but parent is the the smallest lexicographically
      union(parentA, parentB, parent)
  }
  // Get the result
  let result = '';
  for (let i = 0; i < baseStr.length; i++) {
      let c = baseStr[i];
      // If the letter of baseStr is not present
      // we need to use it as base result
      // Each key in the parent has its connection so we need to find
      // the parent key until we find the lexicographically smallest character
      if (c in parent) {
          let parentTmp = findParent(c, parent);
          result += parentTmp;
      } else {
          result += c;
      }
  }
  return result;
};

function findParent(node, parent) {
  if (parent[node] === node) {
      return node;
  }
  return findParent(parent[node], parent);
}

function union(nodeA, nodeB, parent) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);

  // Set the parent to be the smallest lexicographically
  if (parentA < parentB) {
      parent[parentB] = parentA;
  } else {
      parent[parentA] = parentB;
  }
}

/*
class Solution {
  public String smallestEquivalentString(String s1, String s2, String baseStr) {
      Map<Character, List<Character>> charMap = new HashMap<>();

      // { a: [c] c:[a], b: []}
      for (int i=0; i < s1.length(); i++){
          char a = s1.charAt(i);
          char b = s2.charAt(i);
          List<Character> listA = charMap.getOrDefault(a, new ArrayList<>());
          List<Character> listB = charMap.getOrDefault(b, new ArrayList<>());
          listA.add(b);
          listB.add(a);
          charMap.put(a, listA);
          charMap.put(b, listB);
      }

      StringBuilder sb = new StringBuilder();
      for(int i = 0; i < baseStr.length(); i++) {
          char ch = getMin(baseStr.charAt(i), charMap);
          sb.append(ch);
      }
      return sb.toString();
  }

  private char getMin(char a, Map<Character, List<Character>> map){
      Stack<Character> stack = new Stack<>();
      Set<Character> visited = new HashSet<>();
      stack.push(a);
      char min = 'z';
      while(!stack.isEmpty()) {
          char curr = stack.pop();
          visited.add(curr);
          List<Character> childs = map.get(curr);
          min = min > curr ? curr : min;
          if(childs != null) {
              for(Character ch : childs){
                  if(!visited.contains(ch)){
                      stack.push(ch);
                  }
              }
          }
      }
      return min;
  }
}
*/