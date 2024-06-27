/*
There is an infrastructure of n cities with some number of roads connecting these cities.
Each roads[i] = [ai, bi] indicates that there is a bidirectional road between cities ai and bi.

The network rank of two different cities is defined as the total number of directly connected
roads to either city. If a road is directly connected to both cities, it is only counted once.

The maximal network rank of the infrastructure is the maximum network rank of all pairs of different cities.

Given the integer n and the array roads, return the maximal network rank of the entire infrastructure.

https://leetcode.com/problems/maximal-network-rank/?envType=study-plan-v2&envId=graph-theory
*/

var maximalNetworkRank = function(n, roads) {
    if (!roads.length) {
        return 0;
    }

    let graph = {};
    let indegree = new Array(n).fill(0);
    let maxDegree = 0;
    for (let node of roads) {
        [from, to] = node;
        if (!(from in graph)) {
            graph[from] = new Set();
        }
        if (!(to in graph)) {
            graph[to] = new Set();
        }
        // Increment in degree
        indegree[from]++;
        indegree[to]++;
        // Add nodes
        graph[from].add(to);
        graph[to].add(from);

        maxDegree = Math.max(indegree[from], indegree[to], maxDegree);
    }
    
    let countMax = 0;
    let secondMaxDegree = 0;
    let maxDegreeList = [];
    for (let i = 0; i < indegree.length; i++) {
        let degree = indegree[i];
        if (degree === maxDegree) {
            maxDegreeList.push(i);
        } else {
            secondMaxDegree = Math.max(secondMaxDegree, degree);
        }
    }
    // If there are two max, we need to max sure those are not connnected, if they are
    // we do the max degree * 2 - 1 as it's duplicate, otherwise it´s maxDegree * 2
    if (maxDegreeList.length > 1) {
        return getMaxWithMultipleMaxInDegree(graph, maxDegreeList, maxDegree)
    } else {
        return getMaxwithOneMaxInDegree(graph, maxDegree, indegree, secondMaxDegree);
    }
};

function getMaxWithMultipleMaxInDegree(graph, maxDegreeList, maxDegree) {
    let n = maxDegreeList.length;
    // Find of the pair of max are connected or not
    // iterate over all max degrees
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let nodeA = maxDegreeList[i];
            let nodeB = maxDegreeList[j];
            if(!(graph[nodeA].has(nodeB))) {
                return maxDegree * 2;
            }
        }
    }
    return (maxDegree * 2) - 1;
}

function getMaxwithOneMaxInDegree(graph, maxDegree, indegree, secondMaxDegree) {
    let nodeMaxDegree = 0;
    for (let i = 0; i < indegree.length; i++) {
        let degree = indegree[i];
        if (degree == maxDegree) {
            nodeMaxDegree = i;
        }
    }

    let nodeWithMaxDegreeNeighbors = graph[nodeMaxDegree];
    for (let i = 0; i < indegree.length; i++) {
        if(isDisconnectedSecondMaxNode(i, nodeMaxDegree, indegree, secondMaxDegree, nodeWithMaxDegreeNeighbors)) {
            return maxDegree + secondMaxDegree;
        }
    }
    return maxDegree + secondMaxDegree - 1;
}

function isDisconnectedSecondMaxNode(node, nodeMaxDegree, indegree, secondMaxDegree, nodeWithMaxDegreeNeighbors) {
    return node !== nodeMaxDegree && indegree[node] == secondMaxDegree && !nodeWithMaxDegreeNeighbors.has(node);
}