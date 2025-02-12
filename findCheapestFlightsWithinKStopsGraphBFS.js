/*
There are n cities connected by m flights. Each flight starts from city u
and arrives at v with a price w.

Now given all the cities and flights, together with starting city src and the destination dst, your task is to
find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.

Example 1:
Input: 
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1
Output: 200
Explanation: 
The graph looks like this:

The cheapest price from city 0 to city 2 with at most 1 stop costs 200, as marked
red in the picture.

Example 2:
Input: 
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 0
Output: 500
Explanation: 
The graph looks like this:

The cheapest price from city 0 to city 2 with at most 0 stop costs 500, as marked blue in the picture.

https://leetcode.com/problems/cheapest-flights-within-k-stops/
*/
// Time O(V + E)
// Space O(V)
var findCheapestPrice = function(n, flights, src, dst, k) {
  let result = Number.MAX_SAFE_INTEGER;

  let graph = {};
  // Build graph
  for(let flight of flights) {
      let [srcF, destF, cost] = flight;
      if(!(srcF in graph)) {
          graph[srcF] = [];
      }
      graph[srcF].push([destF, cost]);
  }
  // console.log(graph); // { '0': [ [ 1, 100 ], [ 2, 500 ] ], '1': [ [ 2, 100 ] ] }
  
  let visited = {};
  let queue = [];
  // Initial state
  queue.push([src, 0]);
  
  while(queue.length) {
    let size = queue.length;
    // To respect stops
    if(k < 0) {
        break;
    }
    k--;
    for(let i = 0; i < size; i++) {
      let [dest, weight] = queue.shift();
      let paths = graph[dest] || []; // If there's no paths
      for(let node of paths) {
        let [u, w] = node;
        // Get the cost of the weight from the current node
        // to the new one
        let newCost = weight + w;
        // If the new cost is not less than our cost, there's no need
        // to add that combination into the queue, just the candidates
        // that could be cheaper
        if(newCost > visited[u]) {
            continue;
        }
        // This is a new candidate
        visited[u] = newCost;
        if(u === dst) {
            result = Math.min(result, newCost);
        }
        queue.push([u, newCost]);
      }
    }
  }
  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
