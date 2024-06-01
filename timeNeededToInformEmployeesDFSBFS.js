/*
A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID.

Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee
manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure.

The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates
and they will inform their subordinates, and so on until all employees know about the urgent news.

The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).

Return the number of minutes needed to inform all the employees about the urgent news.

Example 1:
Input: n = 1, headID = 0, manager = [-1], informTime = [0]
Output: 0
Explanation: The head of the company is the only employee in the company.

https://leetcode.com/problems/time-needed-to-inform-all-employees/description/?envType=study-plan-v2&envId=graph-theory
*/

// DFS
// Time O(V + E)
// Space O(V + E)
var numOfMinutes = function (n, headID, manager, informTime) {
  let graph = {};

  // Initialize all employees
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  // Create the graph, the key is the employee and the values
  // are their directs
  for (let i = 0; i < manager.length; i++) {
    let managerIndex = manager[i];
    // We don't need the -1 index as it shows only that we are
    // iterating for the same manager
    if (managerIndex === -1) {
      continue;
    }
    graph[managerIndex].push(i);
  }

  return dfs(headID, graph, informTime);
};

function dfs(node, graph, informTime) {
  let time = 0;
  // Get the time of all manager to inform their directs
  for (let neighbor of graph[node]) {
    // Get the maximum time to spread the news to all subordinates
    time = Math.max(dfs(neighbor, graph, informTime), time);
  }
  // Return the time to spread to all his subordinates
  // the time for the current manager to let his subordinates
  return time + informTime[Number(node)];
}

//BFS
// Time O(V + E)
// Space O(V + E)
var numOfMinutes = function (n, headID, manager, informTime) {
  let graph = {};

  // Initialize all employees
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  // Create the graph, the key is the employee and the values
  // are their directs
  for (let i = 0; i < manager.length; i++) {
    let managerIndex = manager[i];
    // We don't need the -1 index as it shows only that we are
    // iterating for the same manager
    if (managerIndex === -1) {
      continue;
    }
    graph[managerIndex].push(i);
  }

  let result = 0;
  let queue = [];
  queue.push({ node: headID, time: 0 });

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let { node, time } = queue.shift();

      result = Math.max(result, time);
      for (let neighbor of graph[node]) {
        // Current time accumulated plus the time from the current node
        // to tell this employee
        queue.push({ node: neighbor, time: time + informTime[node] });
      }
    }
  }
  return result;
};
