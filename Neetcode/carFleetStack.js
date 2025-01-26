/*
There are n cars at given miles away from the starting mile 0, traveling to reach the mile target.

You are given two integer array position and speed, both of length n, where position[i] is the starting mile
of the ith car and speed[i] is the speed of the ith car in miles per hour.

A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.
A car fleet is a car or cars driving next to each other. The speed of the car fleet is the minimum speed
of any car in the fleet.

If a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet.
Return the number of car fleets that will arrive at the destination.

Example 1:
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3

Explanation:
The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target.
The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

Example 2:
Input: target = 10, position = [3], speed = [3]
Output: 1
Explanation:
There is only one car, hence there is only one fleet.

Example 3:
Input: target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1
Explanation:
The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The car starting at 4 (speed 1) travels to 5.
Then, the fleet at 4 (speed 2) and the car at position 5 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

https://leetcode.com/problems/car-fleet/description/
*/
// Time O(NLogN)
// Approach
// 1. Sort the cards in descending order of position
// 2. Maintain a stack to tracl the time to reach target
// 3. For each car: If the time to reach the target is less than or equal
// to the time at top of stack, it will intersect with previous car and can travel as a fleet
// 4. The size of the car will the the number of cars fleet to reach the target
var carFleet = function(target, position, speed) {
  let format = [];
  for (let i = 0; i < position.length; i++) {
      format.push({pos: position[i], speed: speed[i]});
  }

  // Order based on position
  format.sort((a, b) => b.pos - a.pos);
  let stack = [];
  for (let car of format) {
      let timeToReachTarget = (target - car.pos) / car.speed;
      // This car drive as a fleet
      // The array is sorted in descending order by position, meaning that cars are closer to the target
      // if time to get to the target is less for the current car, this means that this can be arranged as a
      // fleet so we can group them together. They will move to the pace of the top of the stack
      if (stack.length && timeToReachTarget <= stack[stack.length - 1]) {
          continue;
      }
      // If we cannot group them together, a separate fleet will be in the stack
      stack.push(timeToReachTarget);
  }
  return stack.length;
};
