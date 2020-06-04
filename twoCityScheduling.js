/*
There are 2N people a company is planning to interview. The cost of flying
the i-th person to city A is costs[i][0], and the cost of flying the i-th person to city B is costs[i][1].

Return the minimum cost to fly every person to a city such that exactly
N people arrive in each city.

Example 1:

Input: [[10,20],[30,200],[400,50],[30,20]]
Output: 110
Explanation: 
The first person goes to city A for a cost of 10.
The second person goes to city A for a cost of 30.
The third person goes to city B for a cost of 50.
The fourth person goes to city B for a cost of 20.

The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.
https://leetcode.com/problems/two-city-scheduling/
*/

var twoCitySchedCost = function(costs) {
  // We need to send N people to city A, and N to people B
  // how much does it cost to send all to city A?
  let minCosts = 0;
  for(let cost of costs) {
      let [Acost, Bcost] = cost;
      minCosts += Acost;
  }
  
  // Here we need to minimze the cost, now check the refund we
  // need in order to send people to city B
  let refunds = [];
  for(let i = 0; i < costs.length; i++) {
      refunds[i] = costs[i][1] - costs[i][0];
  }
  
  // Total cost to minimize
  refunds.sort((a, b) => a - b);
  // Divided by 2 because we only need two cities, no need
  // all of the refunds
  for(let i = 0; i < Math.floor(refunds.length/2); i++) {
      minCosts += refunds[i];
  }
  return minCosts;
};