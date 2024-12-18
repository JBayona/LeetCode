// There's a blog system that lets user to respond to other user's comment
// the service shows the responses from the parent commnet in a "tree" form
// we want to show user's comment based on the comments hierarchical structure.

// For example, givent the input
// input = [
//  Comment(1, None)
//  Comment(2, None)
//  Comment(3, None)
//  Comment(4, 1)
//  Comment(5, 1)
//  Comment(8, 4)
//  Comment(6, 5)
//  Comment(7, 6)

// Expected output
// '1'
//         4'
//                 8'
//         5'
//                 6'
//                         7'
// '2'
// '3'

// Time O(M * N)
function createTree(input) {
  let graph = {};
  let roots = [];
  for (let node of input) {
    // This one is reversed
    let [to, from] = node;
    // Don't add nulls
    if (!(from in graph) && from !== null) {
      graph[from] = [];
    }
    if (!(to in graph)) {
      graph[to] = [];
    }
    if (from == null) {
      roots.push(to);
    }
    // As we are not adding
    if (from !== null) {
      graph[from].push(to);
    }
  }
  let result = [];
  let visited = new Set();
  helper(graph, visited, roots, result);
  return result;
}

function helper(graph, visited, roots, result) {
  for (let root of roots) {
    result.push(root);
    let level = 1;
    dfs(graph, root, visited, level, result);
  }
}

function dfs(graph, node, visited, level, result) {
  let nodes = graph[node] || [];
  for (let neighbor of nodes) {
    // Increment padding based on level
    let padding = " ".repeat(level * 8);
    if (visited.has(neighbor)) {
      continue;
    }
    visited.add(neighbor);
    result.push(padding + neighbor);
    dfs(graph, neighbor, visited, level + 1, result);
  }
}

// node, parentNode
input = [
  [1, null],
  [2, null],
  [3, null],
  [4, 1],
  [5, 1],
  [8, 4],
  [6, 5],
  [7, 6],
];
console.log(createTree(input));
