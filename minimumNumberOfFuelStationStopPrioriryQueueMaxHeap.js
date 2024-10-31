/*
A car travels from a starting position to a destination which is target miles
east of the starting position.

There are gas stations along the way. The gas stations are represented as an array
stations where stations[i] = [positioni, fueli] indicates that the ith gas station is
positioni miles east of the starting position and has fueli liters of gas.

The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it.
It uses one liter of gas per one mile that it drives. When the car reaches a gas station,
it may stop and refuel, transferring all the gas from the station into the car.

Return the minimum number of refueling stops the car must make in order to reach its destination.
If it cannot reach the destination, return -1.

Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there.
If the car reaches the destination with 0 fuel left, it is still considered to have arrived.


Example 1:
Input: target = 1, startFuel = 1, stations = []
Output: 0
Explanation: We can reach the target without refueling.

Example 2:
Input: target = 100, startFuel = 1, stations = [[10,100]]
Output: -1
Explanation: We can not reach the target (or even the first gas station).

Example 3:
Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2
Explanation: We start with 10 liters of fuel.
We drive to position 10, expending 10 liters of fuel.  We refuel from 0 liters to 60 liters of gas.
Then, we drive from position 10 to position 60 (expending 50 liters of fuel),
and refuel from 10 liters to 50 liters of gas.  We then drive to and reach the target.
We made 2 refueling stops along the way, so we return 2.A car travels from a starting position to a destination which is target miles east of the starting position.

There are gas stations along the way. The gas stations are represented as an array stations where stations[i] = [positioni, fueli] indicates that the ith gas station is positioni miles east of the starting position and has fueli liters of gas.
The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it. It uses one liter of gas per one mile that it drives. When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.
Return the minimum number of refueling stops the car must make in order to reach its destination. If it cannot reach the destination, return -1.
Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there. If the car reaches the destination with 0 fuel left, it is still considered to have arrived.

https://leetcode.com/problems/minimum-number-of-refueling-stops/description/
*/
// Approach, use a max heap to always try to recharge and use
// the max fuell if a stations is available, if we cannot reach the
// station with the current fuel, we use if we have available on the
// heap. The hap represents the stations we can reach
// Time O(N Log N)
// Space O(N)
var minRefuelStops = function (target, startFuel, stations) {
  if (startFuel >= target) {
    return 0;
  }
  // Create a max heap to store the fuel capacities of
  // stations in such a way that maximum fuel capacity
  // is at the top of the heap
  let maxHeap = new PriorityQueue({
    compare: (a, b) => b - a,
  });

  let index = 0;
  let stops = 0;
  let maxDistanceAllowed = startFuel;
  // Loop until the car reach the target or the ccar is out
  // of fuel
  while (maxDistanceAllowed < target) {
    // If there are still stations and the next onee is within
    // the range, add its fuel capacity to the heap
    if (index < stations.length && stations[index][0] <= maxDistanceAllowed) {
      // Add the fuel
      maxHeap.enqueue(stations[index][1]);
      index++;
    } else if (maxHeap.isEmpty()) {
      // If there are no more stations we won´t be able to reach
      // the target
      return -1;
    } else {
      // Otherwise recharge at the high station and increment
      // stops
      maxDistanceAllowed += maxHeap.dequeue();
      stops++;
    }
  }
  // Return the minimum of stops taken
  return stops;
};
