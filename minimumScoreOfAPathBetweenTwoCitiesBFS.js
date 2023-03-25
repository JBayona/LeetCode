/*
You are given a positive integer n representing n cities numbered from 1 to n.
You are also given a 2D array roads where roads[i] = [ai, bi, distancei] indicates that there
is a bidirectional road between cities ai and bi with a distance equal to distancei.
The cities graph is not necessarily connected.

The score of a path between two cities is defined as the minimum distance of a road in this path.

Return the minimum possible score of a path between cities 1 and n.
Note:
A path is a sequence of roads between two cities.
It is allowed for a path to contain the same road multiple times, and you can visit cities 1
and n multiple times along the path.
The test cases are generated such that there is at least one path between 1 and n.

https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/description/
*/

var minScore = function (n, roads) {
  // Use 1 index, the 0 position is not used

  let graph = new Array(n + 1).fill().map(() => []);
  let visited = new Set();

  for (let i = 0; i < roads.length; i++) {
    let [from, to, distance] = roads[i];
    graph[from].push([to, distance]);
    graph[to].push([from, distance]);
  }

  /*
   // index is the node and [2, 9] from node, weight
      [
          [],
          [ [ 2, 9 ], [ 4, 7 ] ],
          [ [ 1, 9 ], [ 3, 6 ], [ 4, 5 ] ],
          [ [ 2, 6 ] ],
          [ [ 2, 5 ], [ 1, 7 ] ]
      ]
  */

  let queue = [];
  // Starting with node 1 as 0 is not used
  queue.push(1);
  let answer = Infinity;

  while (queue.length) {
    let node = queue.shift();
    // Iterate over all the neighbors
    for (let neighbor of graph[node]) {
      let [to, distance] = neighbor;
      answer = Math.min(answer, distance);
      if (visited.has(to)) {
        continue;
      }
      visited.add(to);
      queue.push(to);
    }
  }
  return answer;
};
