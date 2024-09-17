/*
Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).

Your system should accept a timestamp parameter (in seconds granularity), and you may assume
that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing).
Several hits may arrive roughly at the same time.

Implement the HitCounter class:

HitCounter() Initializes the object of the hit counter system.
void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may happen at the same timestamp.
int getHits(int timestamp) Returns the number of hits in the past 5 minutes from timestamp (i.e., the past 300 seconds).
 

Example 1:
Input
["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
[[], [1], [2], [3], [4], [300], [300], [301]]
Output
[null, null, null, null, 3, null, 4, 3]
Explanation
HitCounter hitCounter = new HitCounter();
hitCounter.hit(1);       // hit at timestamp 1.
hitCounter.hit(2);       // hit at timestamp 2.
hitCounter.hit(3);       // hit at timestamp 3.
hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
hitCounter.hit(300);     // hit at timestamp 300.
hitCounter.getHits(300); // get hits at timestamp 300, return 4.
hitCounter.getHits(301); // get hits at timestamp 301, return 3.

https://leetcode.com/problems/design-hit-counter/description
*/

// Option 1
// Binary Search
HitCounter.prototype.getHits = function(timestamp) {
    // Get all the hits from the past 300 seconds (5 minutes)
    let target = timestamp - 300;
    let start = 0;
    let end = this.ranges.length - 1;
    let res = -1;
    while (start <= end) {
        let mid = Math.ceil((start + end) / 2);
        if (this.ranges[mid] <= target) {
            res = mid;
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    // start will have the closest date, we need to decrement 1 to get all of
    // the previous elements.
    return this.ranges.length - res - 1;
};

// Option 2
// Two Pointers.
var HitCounter = function() {
    this.ranges = [];  
    this.left = 0;
    this.right = 0;
};

/** 
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function(timestamp) {
    // We know that the hit are based on timestamp and they will be increasing
    this.ranges[this.right++] = timestamp;
};

/** 
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function(timestamp) {
    while (this.left < this.right && this.ranges[this.left] <= (timestamp - 300)) {
        this.left++;
    }
    return this.left === this.right ? 0 : this.right - this.left;
};

/** 
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */