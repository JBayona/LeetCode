/*
323. Number of Connected Components in an Undirected Graph

Given n nodes labeled from 0 to n - 1 and a list of
undirected edges (each edge is a pair of nodes), write a function to find the number of
connected components in an undirected graph.

Example 1:

Input: n = 5 and edges = [[0, 1], [1, 2], [3, 4]]

     0          3
     |          |
     1 --- 2    4 

Output: 2

Example 2:

Input: n = 5 and edges = [[0, 1], [1, 2], [2, 3], [3, 4]]

     0           4
     |           |
     1 --- 2 --- 3

Output:  1

Note:
You can assume that no duplicate edges will appear in edges. Since all edges are
undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.
*/

// Union Find
var countComponents = function(n, edges) {
    let map = {};
    let components = n;
    // Set parent to the node itself
    for(let edge of edges) {
        let [x, y] = edge;

        // Set the node to the parent
        if(!(x in map)) {
            map[x] = x;
        }
        // Set the node to the parent
        if(!(y in map)) {
            map[y] = y;
        }
    }

    // {0:0, 1:1, 2:2, 3:3, 4:4}
    // console.log(map);

    for(let edge of edges) {
        let [x, y] = edge;
        let parentA = findParent(x, map);
        let parentB = findParent(y, map); 

        // If both parents are different, it means that they are
        // in the same component, so we need to reduce the possible
        // number of component
        if(parentA !== parentB) {
            union(parentA, parentB, map);
            components--;
        }
    }
    // console.log(map);
    return components;
}

function union(nodeA, nodeB, map) {
    let parentA = findParent(nodeA, map);
    let parentB = findParent(nodeB, map);
    map[parentB] = parentA;
}

// Find the parent
function findParent(node, map) {
    if(map[node] === node) {
        return node;
    }
    return findParent(map[node], map);
}

// edges = [[0, 1], [1, 2], [3, 4]];
// n = 5; // 2
// edges = [[0, 1], [1, 2], [2, 3], [3, 4]];
// n = 5; // 1
edges = [[0,1],[2,3],[1,2]];
n = 4;
console.log(countComponents(n, edges));