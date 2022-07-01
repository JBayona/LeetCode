/*
There is a bookstore owner that has a store open for n minutes. Every minute, some number
of customers enter the store. You are given an integer array customers of length n where customers[i] is the number of the customer that enters the store at the start of the ith minute and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy. You are given a binary array grumpy where grumpy[i] is 1
if the bookstore owner is grumpy during the ith minute, and is 0 otherwise.

When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise, they are satisfied.
The bookstore owner knows a secret technique to keep themselves not grumpy for minutes consecutive minutes, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

Example 1:
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.

Example 2:
Input: customers = [1], grumpy = [0], minutes = 1
Output: 1

https://leetcode.com/problems/grumpy-bookstore-owner/
*/

// Option 1
var maxSatisfied = function(customers, grumpy, minutes) {
    let result = 0;
    // First get the satisfied customers
    for(let i = 0; i < customers.length; i++) {
        if(grumpy[i] === 0) {
            result += customers[i];
            // We can reset them as we already count them
            customers[i] = 0;
        }
    }
    
    // First window
    let currSum = 0;
    for(let i = 0; i < minutes; i++) {
        // Only get grumpy for the window
        // for non grumpy is zero so it´s ok
        currSum += customers[i];
    }
    
    let start = minutes;
    let end = customers.length;
    let max = currSum;
    // Sliding window
    while(start < end) {
        currSum += customers[start];
        currSum -= customers[start - minutes];
        max = Math.max(max, currSum);
        start++;
    }
    return result + max;
};

// Option 2
var maxSatisfied = function(customers, grumpy, minutes) {
    let result = 0;
    for(let i = 0; i < customers.length; i++) {
        if(grumpy[i] === 0) {
            result += customers[i];
        }
    }
    
    let end = customers.length - minutes;
    let start = 0;
    let max = 0;
    while(start <= end) {
        max = Math.max(max, sum(start, start + minutes, customers, grumpy));
        start++;
    }
    return result + max;
};

function sum(start, end, customer, grumpy) {
    let sum = 0;
    for(let i = start; i < end; i++) {
        if(grumpy[i]) {
            sum += customer[i];
        }
    }
    return sum;
}
