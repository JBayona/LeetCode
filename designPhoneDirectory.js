/*
Design a Phone Directory which supports the following operations:

-get: Provide a number which is not assigned to anyone.
-check: Check if a number is available or not.
-release: Recycle or release a number.

Example:

// Init a phone directory containing a total of 3 numbers: 0, 1, and 2.
PhoneDirectory directory = new PhoneDirectory(3);

// It can return any available phone number. Here we assume it returns 0.
directory.get();

// Assume it returns 1.
directory.get();

// The number 2 is available, so return true.
directory.check(2);

// It returns 2, the only number that is left.
directory.get();

// The number 2 is no longer available, so return false.
directory.check(2);

// Release number 2 back to the pool.
directory.release(2);

Number 2 is available again, return true.
directory.check(2);

https://leetcode.com/problems/design-phone-directory/
*/

class PhoneDirectory {
    constructor(maxNumbers) {
        this.hash = {};
        this.availableQueue = [];
        for(let i = 0; i < maxNumbers; i++) {
            this.availableQueue.push(i);
        }
    }
}

// @return - Return an available number. Return -1 if none is available.
PhoneDirectory.prototype.get = function() {
    if(!this.availableQueue.length) {
        return -1;
    }
    let next = this.availableQueue.shift();
    this.hash[next] = true;
    return next;
};

PhoneDirectory.prototype.check = function(number) {
    return !(number in this.hash);
};

PhoneDirectory.prototype.release = function(number) {
    if(number in this.hash) {
        delete this.hash[number];
        this.availableQueue.push(number);
    }
}

let directory = new PhoneDirectory(3);
console.log(directory);
directory.get(); // 0
directory.get(); // 1
console.log(directory);
console.log(directory.check(2)); // true
console.log(directory.check(0)); // false
console.log(directory.check(1)); // false
directory.get(); // 2
console.log(directory);
console.log(directory.check(2)); // false
directory.release(2);
console.log(directory);
console.log(directory.check(2)); // true