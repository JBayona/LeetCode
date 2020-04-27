/*
There are n bulbs that are initially off. You first turn on all the bulbs. Then, you turn off every second bulb. On the third round, you toggle every third bulb (turning on if it's off or turning off if it's on). For the i-th round, you toggle every i bulb. For the n-th round, you only toggle the last bulb. Find how many bulbs are on after n rounds.

Example:

Input: 3
Output: 1 
Explanation: 
At first, the three bulbs are [off, off, off].
After first round, the three bulbs are [on, on, on].
After second round, the three bulbs are [on, off, on].
After third round, the three bulbs are [on, off, off]. 

So you should return 1, because there is only one bulb is on.

https://leetcode.com/problems/bulb-switcher/
*/

// 12 => 12 * 1, 6 * 2, 3 * 4 => off
// 9 => 9 * 1, 3 * 3 => on
var bulbSwitch = function(n) {
    return Math.sqrt(n) | 0;
};

// Brute force
var bulbSwitch = function(n) {
    let bulbs = new Array(n).fill(true);
    let countBulbsOn = n;
    
    for(let i = 2; i <= n; i++) {
        for(let j = i; j <= n; j++) {
            // Check the ith step
            if(j % i === 0) {
                // Bulb is on, we need to turn off
                if(bulbs[j-1] === true) {
                    bulbs[j-1] = false;
                    countBulbsOn--;
                } else {
                    // Bulb is off, we need to turn on
                    bulbs[j-1] = true;
                    countBulbsOn++;
                }
            }
        }
    }
    return countBulbsOn;
};


// 12 => 12 * 1, 6 * 2, 3 * 4 => off
// 9 => 9 * 1, 3 * 3 => on
var bulbSwitch = function(n) {
    let start = 1;
    while(start * start <= n) {
        start += 1;
    }
    return start - 1;
};

// 12 => 12 * 1, 6 * 2, 3 * 4 => off
// 9 => 9 * 1, 3 * 3 => on
var bulbSwitch = function(n) {
    return Math.sqrt(n) | 0;
}