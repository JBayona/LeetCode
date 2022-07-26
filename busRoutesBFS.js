/*
You are given an array routes representing bus routes where routes[i] is a bus route
that the ith bus repeats forever.

For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in
the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever.

You will start at the bus stop source (You are not on any bus initially), and you want to
go to the bus stop target. You can travel between bus stops by buses only.

Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.

Example 1:
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.

Example 2:
Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1

https://leetcode.com/problems/bus-routes/
*/

// Time O(n^2)
// Space O(n^2)
var numBusesToDestination = function (routes, S, T) {
  let hash = {};
  // Hash that has oon each route which buses it can take
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].length; j++) {
      let route = routes[i][j];
      if (!(route in hash)) {
        hash[route] = [i];
      } else {
        hash[route].push(i);
      }
    }
  }

  // Create a set to store the buses that have already been taken
  let visitedBus = new Set();
  // Create a set to store the stops that have already been visited
  let visitedStop = new Set();
  let busesTaken = 0;

  // Create a queue to keep track of the stops your can access from the current source
  let queue = [S];
  visitedStop.add(S);

  while (queue.length) {
    // From the current stop how many stops can you access before hopping on to another bus
    let routeLength = queue.length;
    for (let i = 0; i < routeLength; i++) {
      // Get the current bus stop that you are at
      let busStop = queue.shift();
      if (busStop === T) {
        return busesTaken;
      }
      // Loop through the current bus stop to check if you can hop on another bus
      for (let bus of hash[busStop]) {
        if (visitedBus.has(bus)) {
          continue;
        }
        for (let stop of routes[bus]) {
          if (visitedStop.has(stop)) {
            continue;
          }
          queue.push(stop);
          visitedStop.add(stop);
        }
        visitedBus.add(bus);
      }
    }
    busesTaken++;
  }
  return -1;
};
