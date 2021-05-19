/*
Given a list of daily temperatures temperatures, return a list such that, for each
day in the input, tells you how many days you would have to wait until a warmer temperature. If there
is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures temperatures = [73, 74, 75, 71, 69, 72, 76, 73], your
output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an
integer in the range [30, 100].

https://leetcode.com/problems/daily-temperatures/
*/

// Same deal as the "next larger element" problem.
var dailyTemperatures = function(temperatures) {
    let stack = [];
    let result = new Array(temperatures.length).fill(0);
    
    for(let i = 0; i < temperatures.length; i++) {
        // Find the first greater element
        while(stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            // This index has the position of the current element we are analyzing
            // temperatures[i] is the greater element so doing i - index will get
            // how many items we check in order to get the first greater
            let index = stack.pop();
            result[index] = i - index;
        }
        stack.push(i);
    }
    return result;
};

// Time O(N^2)
// Time O(1)
var dailyTemperatures = function(temperatures) {
    let result = new Array(temperatures.length).fill(0);
    for(let i = 0; i < temperatures.length; i++) {
        let currentTemperature = temperatures[i];
        let count = 1;
        for(let j = i + 1; j < temperatures.length; j++) {
            let futureTemperature = temperatures[j];
            if(futureTemperature > currentTemperature) {
                result[i] = count;
                break;
            } else {
                count++;
            }
        }
    }
    return result;
};