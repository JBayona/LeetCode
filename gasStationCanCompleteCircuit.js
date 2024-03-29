/*
There are N gas stations along a circular route, where the amount of gas at station i is gas[i].
You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from station i to
its next station (i+1). You begin the journey with an empty tank at one of the gas stations.
Return the starting gas station's index if you can travel around the circuit once in the
clockwise direction, otherwise return -1.

Note:
If there exists a solution, it is guaranteed to be unique.
Both input arrays are non-empty and have the same length.
Each element in the input arrays is a non-negative integer.

Example 1:
Input: 
gas  = [1,2,3,4,5]
cost = [3,4,5,1,2]
Output: 3

Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.

Example 2:
Input: 
gas  = [2,3,4]
cost = [3,4,3]
Output: -1

Explanation:
You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.

https://leetcode.com/problems/gas-station/
*/

// Time O(N^2)
// Space O(N)
var canCompleteCircuit = function(gas, cost) {
    let n = gas.length;
    for(let i = 0; i < n; i++) {
        let gasAvailable = 0;
        let stationsVisited = 0;
        let index = i;
        // Check for the n options
        while(stationsVisited < n) {
            // Use mod to loop the cycle
            gasAvailable += gas[index % n] - cost[index % n];
            // If we can not complete the trip
            if(gasAvailable < 0) {
                break;
            }
            // We can move forward
            stationsVisited++;
            index++;
            if(stationsVisited === n && gasAvailable >= 0) {
                return i;
            }
        }
    }
    return -1;
};

/*
The idea is to have enough gas to reach next station, then we will move to next station.
Otherwise we will start from next station

First we take 0th station as our starting station
then, we will fill gas and subtract the cost to reach next station.
if filled < 0, this means we are lacking of gas to reach the station.
So, we will start freshly from next station 
and we will also store the gas required to reach 0th station to ith station 
because we need to circularly reach the starting station. 
Instead of traversing again from 0th station 
if we store gas required to reach 0th station to ith station, 
if we have enough gas, then we will return starting station,
Otherwise return -1.
*/

// Time O(N)
// Space O(N)
var canCompleteCircuit = function(gas, cost) {
    let filled = 0;
    let required = 0;
    let result = 0;
    for(let i = 0; i < gas.length; i++) {
        filled += gas[i] - cost[i];
        if(filled < 0) {
            required += filled;
            filled = 0;
            result = i + 1;
        }
    }
    return filled >= Math.abs(required) ? result : -1;
};
