/*
You are given an integer n. There is an undirected graph with n nodes
numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes
that there exists an undirected edge connecting nodes ai and bi.

Return the number of pairs of different nodes that are unreachable from each other.

https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/description/
*/

var countPairs = function (n, edges) {
  let parent = {};
  // Set parent to their own parent
  for (let i = 0; i < n; i++) {
    parent[i] = i;
  }

  // Union find
  for (let edge of edges) {
    let [from, to] = edge;
    let parentA = findParent(from, parent);
    let parentB = findParent(to, parent);

    // Redundant connection
    if (parentA === parentB) {
      continue;
    }

    union(from, to, parent);
  }

  let countMap = {};
  for (let node in parent) {
    let k = parent[node];
    if (!(k in countMap)) {
      countMap[k] = 0;
    }
    countMap[k]++;
  }

  let result = 0;
  for (let prop in countMap) {
    result += countMap[prop] * (n - countMap[prop]);
    // To avoid counting duplicates
    n -= countMap[prop];
  }
  return result;
};

function union(nodeA, nodeB, parent) {
  let parentA = findParent(nodeA, parent);
  let parentB = findParent(nodeB, parent);
  // Assign as parent the first node's parent
  parent[parentB] = parentA;
}

function findParent(node, parent) {
  if (parent[node] === node) {
    return node;
  }
  return findParent(parent[node], parent);
}
