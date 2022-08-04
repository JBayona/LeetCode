/*
On a 2D plane, we place n stones at some integer coordinate points.
Each coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same
column as another stone that has not been removed.

Given an array stones of length n where stones[i] = [xi, yi] represents the
location of the ith stone return the largest possible number of stones that can be removed.

Example 1:
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5

Explanation: One way to remove 5 stones is as follows:
1. Remove stone [2,2] because it shares the same row as [2,1].
2. Remove stone [2,1] because it shares the same column as [0,1].
3. Remove stone [1,2] because it shares the same row as [1,0].
4. Remove stone [1,0] because it shares the same column as [0,0].
5. Remove stone [0,1] because it shares the same row as [0,0].
Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.

Example 2:
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: One way to make 3 moves is as follows:
1. Remove stone [2,2] because it shares the same row as [2,0].
2. Remove stone [2,0] because it shares the same column as [0,0].
3. Remove stone [0,2] because it shares the same row as [0,0].
Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.

Example 3:
Input: stones = [[0,0]]
Output: 0
Explanation: [0,0] is the only stone on the plane, so you cannot remove it.

https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
*/

// Union Find
// O(V + E)
var removeStones = function (stones) {
  let parent = {};
  let numComponents = { n: stones.length };
  // Assing each parent as its own root
  for (let i = 0; i < stones.length; i++) {
    parent[i] = i;
  }

  for (let i = 0; i < stones.length; i++) {
    for (let j = i + 1; j < stones.length; j++) {
      // If two stones are connected (i.e share the same row or column), unite them
      if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
        union(i, j, parent, numComponents);
      }
    }
  }
  // this is the most confusing part.
  // The number of stones can be removed is not equal to the number of islands.
  // e.g. we have two islands with total of 10 stores, each island will leave one extra stone after the
  // removal, therefore we can remove 10 - 2 = 8 stones in total
  return stones.length - numComponents.n;
};

function findParent(node, parent) {
  if (node === parent[node]) {
    return node;
  }
  return findParent(parent[node], parent);
}

function union(nodeA, nodeB, parent, numComponents) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);
  if (parentA !== parentB) {
    numComponents.n--;
    parent[parentB] = parentA;
  }
}
