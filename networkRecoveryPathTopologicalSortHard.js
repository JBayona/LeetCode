// The problem basically ask us: Find a path where the minimum edge cost is as large as possible.
/*
We need to find the minimum largest cost, for example:
0 --4--> 1 --8--> 3
 \
  \--6--> 2 --5--> 3

Path
0 → 1 → 3
Edges:
4
min(4,8)=4

Path B:
0 → 2 → 3

Edges:
6
min(6,5)=5

Given 5 > 4. This path is better as it's minimum largest cost

Time Complexity: O(logW)×O(V+E) = O((V+E) log W)

| Step              | Complexity |
| ----------------- | ---------- |
| Build graph       | O(E)       |
| Topological sort  | O(V + E)   |
| Binary search     | O(log W)   |
| Each `canReach()` | O(V + E)   |

Space: O(V + E)

https://leetcode.com/problems/network-recovery-pathways/
*/
var findMaxPathScore = function (edges, online, k) {
  let n = online.length;

  // Build the graph
  let graph = [];
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  let indegree = new Array(n).fill(0);
  let maxCost = 0;
  for (const [from, to, cost] of edges) {
    graph[from].push([to, cost]);
    // Degree help us to find the topological order
    indegree[to]++;
    maxCost = Math.max(maxCost, cost);
  }

  // Topological order
  let queue = [];
  let topo = [];
  let degree = [...indegree];

  // Each position has the degree of each node
  // only the starting node will be zero
  // console.log(degree);

  // Add the nodes with zero degree (starting node)
  // Find the first node
  for (let i = 0; i < n; i++) {
    if (degree[i] === 0) {
      queue.push(i);
    }
  }

  // Topological order, this simple order nodes in a way
  // that every node appears before all of the nodes it points to
  while (queue.length) {
    let node = queue.shift();
    topo.push(node);

    for (const [next, cost] of graph[node]) {
      degree[next]--;
      if (degree[next] === 0) {
        queue.push(next);
      }
    }
  }

  // Nodes already ordered
  // console.log(topo);

  // Binary Search
  // We search for the largest minimm edge weight that
  // still allows a valid path
  let left = 0;
  let right = maxCost;
  let answer = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    // a path exist
    if (canReach(graph, topo, mid, online, k)) {
      answer = mid;
      // Try making the min edge larger
      left = mid + 1;
    } else {
      // No path exist
      right = mid - 1;
    }
  }
  return answer;
};

function canReach(graph, topo, mid, online, k) {
  let n = graph.length;
  // Min cost to reach noce i
  let minDist = Array(n).fill(Infinity);
  // Node 0 is always starting node
  minDist[0] = 0;

  for (const node of topo) {
    // Can't do anything as this node has not been reacher
    if (minDist[node] === Infinity) {
      continue;
    }
    // First node, last node and offline nodes cannot be
    // accesible
    if (node !== 0 && node !== n - 1 && !online[node]) {
      continue;
    }
    // Explore the edges
    for (let [u, cost] of graph[node]) {
      // This needs to be < as we are running binary search
      // and we need to meet our binary guess, it should be >= to be a candidate
      if (cost < mid) {
        continue;
      }

      // Can't travel without offline nodes
      if (u !== n - 1 && !online[u]) {
        continue
      }

      // Get the min path cost
      minDist[u] = Math.min(minDist[u], minDist[node] + cost);
    }
  }
  // Return if the cheapest valid path is withing the constraint
  return minDist[n - 1] <= k
}