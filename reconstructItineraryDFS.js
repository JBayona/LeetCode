/*
You are given a list of airline tickets where tickets[i] = [fromi, toi] represent
the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the
itinerary must begin with "JFK". If there are multiple valid itineraries, you should
return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

https://leetcode.com/problems/reconstruct-itinerary/description/
*/
// Approach recursive, we start from the JFK
// Construct a direct graph and recursively run with all destinations
// until we find there´s no other destination, we backtrack, that means that
// we are adding in front the first destiny but it will be the last
// as we are pushing the elements into a stack, the first element "NYC" will
// at the end of the list and that´s why we need to reverse the elements
// Time O(N Log N)
var findItinerary = function (tickets) {
  const graph = {};

  // Populate the flight map with each departure and arrival
  // Direct graph
  for (let ticket of tickets) {
      let [from, to] = ticket;
      if (!(from in graph)) {
          graph[from] = [];
      }
      graph[from].push(to);
  }

  // Sort each list of destinations in reverse
  // lexicographical order
  for (let prop in graph) {
      graph[prop].sort().reverse();
  }

  const result = [];
  // Run DFS, start from JFK
  dfs('JFK', graph, result);
  // We need to reverse it as we push the elements in the array
  // So elements are in reverse
  return result.reverse();
};

function dfs(current, graph, result) {
  // It has alll destinations, take from the back if there are
  // multiples as we need them in lexicographical order
  const destinations = graph[current];
  // Traverse all destinations in the order of their lexicographical 
  // sorting
  while (destinations && destinations.length) {
      // Pop the last destination from the list (smallest lexicographical 
      // order due to reverse sorting)
      const nextDestination = destinations.pop();
      // Recursively perform DFS on the next destination
      dfs(nextDestination, graph, result);
  }

  // Append the current airport to the result after all destinations are 
  // visited
  result.push(current);
}


var findItinerary = function (tickets) {
  const graph = {};

  // Populate the flight map with each departure and arrival
  // Direct graph
  for (let ticket of tickets) {
      let [from, to] = ticket;
      if (!(from in graph)) {
          graph[from] = [];
      }
      graph[from].push(to);
  }

  // Sort each list of destinations in reverse
  // lexicographical order
  for (let prop in graph) {
      graph[prop].sort().reverse();
  }

  const result = [];
  // Run DFS, start from JFK
  dfs('JFK', graph, result);
  // We need to reverse it as we push the elements in the array
  // So elements are in reverse
  return result.reverse();
};

function dfs(current, graph, result) {
  // It has alll destinations, take from the back if there are
  // multiples as we need them in lexicographical order
  const destinations = graph[current];
  // Traverse all destinations in the order of their lexicographical 
  // sorting
  while (destinations && destinations.length) {
      // Pop the last destination from the list (smallest lexicographical 
      // order due to reverse sorting)
      const nextDestination = destinations.pop();
      // Recursively perform DFS on the next destination
      dfs(nextDestination, graph, result);
  }

  // Append the current airport to the result after all destinations are 
  // visited
  result.push(current);
}