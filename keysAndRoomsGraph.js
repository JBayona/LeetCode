/*
There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms.
However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks,
and you can take all of them with you to unlock the other rooms.

Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.

Example 1:
Input: rooms = [[1],[2],[3],[]]
Output: true
Explanation: 
We visit room 0 and pick up key 1.
We then visit room 1 and pick up key 2.
We then visit room 2 and pick up key 3.
We then visit room 3.
Since we were able to visit every room, we return true.

Example 2:
Input: rooms = [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.

https://leetcode.com/problems/keys-and-rooms/description/?envType=study-plan-v2&envId=graph-theory
*/
// Time O (V + E) where V are vertices and E are edges
var canVisitAllRooms = function (graph) {
  let visited = new Array(graph.length).fill(false);
  // Start with room 0 as the room is unlocked by default
  dfs(0, visited, graph);
  // All visited should be set to true
  return visited.every((n) => n === true);
};

function dfs(node, visited, graph) {
  visited[node] = true;
  for (let neighbor of graph[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor, visited, graph);
    }
  }
}

// BFS
// Time O (V + E) where V are vertices and E are edges
var canVisitAllRooms = function (graph) {
  let visited = new Array(graph.length).fill(false);
  let queue = [];

  // Start with the first room
  queue.push(0);
  visited[0] = true;
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      for (let neighbor of graph[node]) {
        // If visited already, let's skip it
        if (visited[neighbor]) {
          continue;
        }
        // Mark as visited and iterate it again
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
  return visited.every((n) => n === true);
};
