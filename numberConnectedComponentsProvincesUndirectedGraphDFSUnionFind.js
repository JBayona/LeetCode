/*
There are n cities. Some of them are connected, while some are not. If city a is connected
directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.
You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are
directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

https://leetcode.com/problems/number-of-provinces/
*/

// Union Find
// O(V + E)
var findCircleNum = function(isConnected) {
    let parent = {};
    for (let i = 0; i < isConnected[0].length; i++) {
        parent[i] = i;
    }
    
    // We assume each city is on its own area, whenever we are able to connect them
    // we rest by 1 the number of provinces, alternativelly we can check for the map and count
    // how many keys have the same value
    let components = isConnected.length;
    // Union find
    for (let i = 0; i < isConnected.length; i++) {
        for (let j = i + 1; j < isConnected[i].length; j++) {
            // If they are connected, try to join them
            if (isConnected[i][j]) {
                let parentA = findParent(i, parent);
                let parentB = findParent(j, parent);
                // If the parent is not the same, join them
                if (parentA !== parentB) {
                    union(i, j, parent);
                    components--;
                }
            }
        }
    }
    return components;
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
    parent[parentB] = parentA;
}


// DFS
// O(V + E)
var findCircleNum = function(isConnected) {
    let graph = {};
    for (let i = 0; i < isConnected.length; i++) {
        graph[i] = [];
    }

    for (let i = 0; i < isConnected.length; i++) {
        for (let j = 0; j < isConnected[i].length; j++) {
            // Avoid the same node
            if (i !== j && isConnected[i][j] === 1) {
                graph[i].push(j)
            }
        }
    }
    
    // Count components
    let n = isConnected.length;
    let visited = new Array(n).fill(false);
    let result = 0;
    for (let i = 0; i < n; i++) {
        if (visited[i] === false) {
            dfs(i, visited, graph);
            result++;
        }
    }
    return result;
};

function dfs(node, visited, graph) {
    visited[node] = true;
    for (let neighbor of graph[node]) {
        if (visited[neighbor] === false) {
            dfs(neighbor, visited, graph);
        }
    }
}



// DFS Second option
// DFS (M + N)
var findCircleNum = function(grid) {
    let visited = new Array(grid.length).fill(false);
    let result = 0;
    // i represents each node
    for (let i = 0; i < grid.length; i++) {
        if (!visited[i]) {
            dfs(i, grid, visited);
            result++;
        }
    }
    return result;
};

function dfs(node, grid, visited) {
    for (let i = 0; i < grid[node].length; i++) {
        if (!visited[i] && grid[node][i]) {
            visited[i] = true;
            dfs(i, grid, visited);
        }
    }
}




// Union Find Option 2
 // Union Find
// O(V + E)
var findCircleNum = function(isConnected) {
    let parent = {};
    for (let i = 0; i < isConnected[0].length; i++) {
        parent[i] = i;
    }
    
    // Union find
    for (let i = 0; i < isConnected.length; i++) {
        for (let j = i + 1; j < isConnected[i].length; j++) {
            // If they are connected, try to join them
            if (isConnected[i][j]) {
                let parentA = findParent(i, parent);
                let parentB = findParent(j, parent);
                // If the parent is not the same, join them
                if (parentA !== parentB) {
                    union(i, j, parent);
                }
            }
        }
    }
    // Get the result
    let result = 0;
    for (let i = 0; i < isConnected.length; i++) {
        // Whenever it's the same parent, those are the different values
        if (parent[i] === i) {
            result++;
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
    parent[parentB] = parentA;
}