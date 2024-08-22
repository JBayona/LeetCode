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

// Union find
var findRedundantConnection = function(edges) {
    let parent = {};
    
    // Set parent nodes to itself
    for(let i = 0; i < edges.length; i++) {
        let nodes = edges[i];
        let fromNode = nodes[0];
        let toNode = nodes[1];
        
        // Set root to all nodes
        if(!(fromNode in parent)) {
            parent[fromNode] = fromNode;
        }
        
        if(!(toNode in parent)) {
            parent[toNode] = toNode;
        }   
    }
    
    console.log('Beginning');
    console.log(parent); // {1:1, 2:2, 3:3}
    
    for(let i = 0; i < edges.length; i++) {
        let nodes = edges[i];
        let fromNode = nodes[0];
        let toNode = nodes[1];
        let parent1 = findParent(fromNode, parent);
        let parent2 = findParent(toNode, parent);

        console.log('HERE');
        console.log('DE ', fromNode);
        console.log('TO ', toNode);
        console.log('PARENT 1', parent1);
        console.log('PARENT 2', parent2);
        
        // If both parents are the same, we have found the redundant connection
        // Cuando encuentra que en los dos nodos el root es el mismo
        // entonces esa es la conexión que está de más
        if(parent1 === parent2) {
            return nodes;
        }
        
        // Union - set boths nodes with one common parent as they are connected
        union(fromNode, toNode, parent);
        console.log(parent); // { '1': 2, '2': 1, '3': 1 }
    }
};
/*
  1
 / \
2 - 3
{1: 1, 2: 2, 3: 3}
{1: 1, 2: 1, 3: 3}
{1: 1, 2: 1, 3: 1}
*/

// Use node A to set it as parent
function union(nodeA, nodeB, parent) {
    let parentA = findParent(nodeA, parent);
    let parentB = findParent(nodeB, parent);
    parent[parentB] = parentA;
}

// Se va recursivamente a todos los niveles hasta encontrar al padre
function findParent(node, parent) {
    if(parent[node] === node) {
        return node;
    }
    return findParent(parent[node], parent);
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