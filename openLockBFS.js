/*
You have a lock in front of you with 4 circular wheels.
Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we
can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot.

The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.

Example 1:
Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6

Explanation:
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".

Example 2:
Input: deadends = ["8888"], target = "0009"
Output: 1

Explanation:
We can turn the last wheel in reverse to move from "0000" -> "0009".

Example 3:
Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation:
We can't reach the target without getting stuck.

Example 4:
Input: deadends = ["0000"], target = "8888"
Output: -1

https://leetcode.com/problems/open-the-lock/
*/

// BFS
// Time O(N)
// Space O(N)
var openLock = function(deadends, target) {
    // These combinations are locked and can not move forward if we reach them
    let set = new Set(deadends);
    let seen = new Set();
    let queue = [];
    
    // Firs position
    // Initial position
    queue.push({combination: '0000', distance: 0});
    // To avoid seen duplicates
    seen.add('0000');
    while(queue.length) {
        let node = queue.shift();
        let combination = node.combination;
        let distance = node.distance;
        
        // Skip the combination if we reach the deadend
        if(set.has(combination)) {
            continue;
        }
        
        // Check if we are done and we found the combination
        if(combination === target) {
            return distance;
        }
        
        // We have 4 wheels, try with every wheel
        // For every combination we do both, increasing one and decreasing one
        for(let i = 0; i < 4; i++) {
            // Get the new combination by increasing one
            let newIncCombination = combination.substring(0, i) + 
                // If we are at 9, we should reset to 0, otherwise just increment
                (combination.charAt(i) !== '9' ? (Number(combination.charAt(i)) + 1).toString() : '0') +
                combination.substring(i+1, 4);
            
            // Make sure we do not see the combination before
            if(!seen.has(newIncCombination)) {
                seen.add(newIncCombination);
                queue.push({combination: newIncCombination, distance: distance + 1});
            }
            
            // Get the new combination by decreasing one and if we are at 0, we should place the
            // number at 9, otherwhise just decrement by one
            let newDecCombination = combination.substring(0, i) + 
                (combination.charAt(i) !== '0' ? (Number(combination.charAt(i)) - 1).toString() : '9') +
                combination.substring(i+1, 4);
            
            // Make sure we don´t see that combination before
            if(!seen.has(newDecCombination)) {
                seen.add(newDecCombination);
                queue.push({combination: newDecCombination, distance: distance + 1});
            }
            
        }
    }
    return -1;
};