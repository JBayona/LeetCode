/*
In this problem, a tree is an undirected graph that is connected and has no cycles.

The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one
additional edge added. The added edge has two different vertices chosen from 1 to N, and was not
an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [u, v] with u < v, that
represents an undirected edge connecting nodes u and v.

Return an edge that can be removed so that the resulting graph is a tree of N nodes.
If there are multiple answers, return the answer that occurs last in the given 2D-array.
The answer edge [u, v] should be in the same format, with u < v.

Example 1:
Input: [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: The given undirected graph will be like this:
  1
 / \
2 - 3

Example 2:
Input: [[1,2], [2,3], [3,4], [1,4], [1,5]]
Output: [1,4]

Explanation: The given undirected graph will be like this:
5 - 1 - 2
    |   |
    4 - 3
Note:
The size of the input 2D-array will be between 3 and 1000.
Every integer represented in the 2D-array will be between 1 and N, where N is the size of the input array.

Update (2017-09-26):
We have overhauled the problem description + test cases and specified clearly the graph is an undirected graph.
For the directed graph follow up please see Redundant Connection II). We apologize for any inconvenience caused.

https://leetcode.com/problems/redundant-connection/
*/

// Time O(N)
var findRedundantConnection = function(edges) {
    // Set the parent to its own node
    let parent = {};
    for (let node of edges) {
        let [from, to] = node;
        if (!(from in parent)) {
            parent[from] = from;
        }
        if (!(to in parent)) {
            parent[to] = to;
        }
    }

    for (let node of edges) {
        let [from, to] = node;
        let parentA = findParent(from, parent);
        let parentB = findParent(to, parent);

        // This node is redundant connection
        if (parentA === parentB) {
            return [from, to];
        }
        // Union
        union(from, to, parent);
    }
    return [];
};

function findParent(node, parent) {
    if (parent[node] === node) {
        return parent[node];
    }
    return findParent(parent[node], parent);
}

function union(nodeA, nodeB, parent) {
    let parentA = findParent(nodeA, parent);
    let parentB = findParent(nodeB, parent);
    parent[parentB] = parentA;
}

// DFS
/*
var findRedundantConnection = function(edges) {
    let graph = {};
    let len = edges.length;
    // Initialize first nodes in case of the labels does not exist
    for (let i = 1; i <= edges.length; i++) {
        graph[i] = [];
    }


    // Create graph
    for (let edge of edges) {
        let [from, to] = edge;
        if (!(from in graph)) {
            graph[from] = [];
        }
        if (!(to in graph)) {
            graph[to] = [];
        }
        graph[from].push(to);
        graph[to].push(from);

        // Try to find reduntant connections for every insertion
        if (hasCycle(graph, len)) {
            return [from, to];
        }
    }
    return [-1. -1];
};

function hasCycle(graph, len) {
    // + 1 as it's 1-index
    let visited = new Array(len + 1).fill(false);
    for (let i = 1; i <= len; i++) {
        if (!visited[i]) {
            if (dfs(graph, visited, i, -1)) {
                return true;
            }
        }
    }
    return false;
}


function dfs(graph, visited, node, parent) {
    for(let neighbor of graph[node]) {
        if(neighbor === parent) {
            continue;
        }
        // We have a cycle already
        if(visited[neighbor]) {
            return true;
        } else {
            visited[neighbor] = true;
            if(dfs(graph, visited, neighbor, node)) {
                return true;
            }
        }
    }
    // The node has not been visited
    return false;
}
*/

edges = [[1,2],[1,3],[2,3]]
console.log(findRedundantConnection(edges));