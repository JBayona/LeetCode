/*
Design a hit counter which counts the number of hits received in
the past 5 minutes (i.e., the past 300 seconds).

Your system should accept a timestamp parameter (in seconds granularity), and you may assume
that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing).
Several hits may arrive roughly at the same time.

Implement the HitCounter class:

HitCounter() Initializes the object of the hit counter system.
void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may
happen at the same timestamp.
int getHits(int timestamp) Returns the number of hits in the past 5 minutes from
timestamp (i.e., the past 300 seconds).

https://leetcode.com/problems/design-hit-counter/
*/

// Option 1 - Array
var HitCounter = function() {
    this.hits = [];
};

HitCounter.prototype.hit = function(timestamp) {
    this.hits.push(timestamp);
};

HitCounter.prototype.getHits = function(timestamp) {
    if(timestamp < 300) {
        return this.hits.length;
    }
    
    let start = timestamp - 300 + 1;
    let hits = 0;
    console.log(start, timestamp);
    for(let i = this.hits.length - 1; i >= 0; i--) {
        // We are not interested in these values
        if(this.hits[i] < start) {
            break;
        } else {
            hits++;
        }
    }
    return hits;
};

// Option 2 queue
var HitCounter = function() {
    this.queue = [];
};

HitCounter.prototype.hit = function(timestamp) {
    this.queue.push(timestamp);
};

// We are makiing the assumption that all are
// in increasing number
HitCounter.prototype.getHits = function(timestamp) {
    while(this.queue.length) {
        let diff = timestamp - this.queue[0];
        if(diff >= 300) {
            this.queue.shift();
        } else {
            break;
        }
    }
    return this.queue.length;
};