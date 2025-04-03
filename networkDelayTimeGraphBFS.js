/*
You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi
is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal.
If it is impossible for all the n nodes to receive the signal, return -1.

Example 1:
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2

Example 2:
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1

Example 3:
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1

https://leetcode.com/problems/network-delay-time/description/
*/

// Time (O((V + E) log V)), where (V) is the number of nodes and (E) is the number of edges
var networkDelayTime = function(times, n, k) {
    let graph = {};
    for (let i = 0; i <= n; i++) {
        graph[i] = [];
    }

    for (let time of times) {
        let [from, to, t] = time;
        graph[from].push({node: to, time: t});
    }

    let heap = new PriorityQueue({
        compare: (a, b) => a.time - b.time
    });

    const visit = new Set();
    let result = 0;

    heap.enqueue({node: k, time: 0});
    while (!heap.isEmpty()) {
        let {node, time} = heap.dequeue();
        if (visit.has(node)) {
            continue;
        }
        visit.add(node);
        result = Math.max(result, time);
        for (let neighbor of graph[node]) {
            if (!visit.has(neighbor.node)) {
                heap.enqueue({node: neighbor.node, time: time + neighbor.time});
            }
        }
    }
    return visit.size === n ? result : -1;
};
