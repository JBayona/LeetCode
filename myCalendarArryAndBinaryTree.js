/*
You are implementing a program to use as your calendar. We can add a new event if adding the event
will not cause a double booking. A double booking happens when two events have
some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers start and end that represents a booking on
the half-open interval [start, end), the range of real numbers x such that start <= x < end.

Implement the MyCalendar class:

MyCalendar() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully
without causing a double booking. Otherwise, return false and do not add the event to the calendar.
 
Example 1:
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every
time less than 20, but not including 20.

https://leetcode.com/problems/my-calendar-i/
*/

// Option 1
var MyCalendar = function() {
    this.arr = [];
};


/** 
 * @param {number} start 
 * @param {number} end
 */
function Interval(start, end) {
    this.start = start;
    this.end = end;
}

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function(start, end) {
    // First element or second element
    if (!this.arr.length || this.arr[this.arr.length - 1].end <= start) {
        this.arr.push(new Interval(start, end));
        return true;
    }
    
    // The element should be in the first position
    if (this.arr[0].start >= end) {
        this.arr.unshift(new Interval(start, end));
        return true;
    }
    
    for(let i = 1; i < this.arr.length; i++) {
        // Insert in the correct order
        if (this.arr[i - 1].end <= start && this.arr[i].start >= end) {
            this.arr.splice(i, 0, new Interval(start, end));
            return true;
        }
    }
    return false;
};

/** 
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

// Option 2
var MyCalendar = function() {
    this.root = null;
};

/** 
 * @param {number} start 
 * @param {number} end
 */
class Node {
    constructor (start, end, left = null, right = null) {
        this.start = start;
        this.end = end;
        this.left = left;
        this.right = right;   
    }
    insert (node) {
        if (this.start >= node.end) {
            // This should be at the left
            if (!this.left) {
                this.left = node;
                return true;
            } else {
                return this.left.insert(node);
            }
        } else if (this.end <= node.start) {
            if (!this.right) {
                this.right = node;
                return true;
            } else {
                return this.right.insert(node);
            }
        } else {
            return false;
        }
    }
}

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function(start, end) {
    // First element
    if (!this.root) {
        this.root = new Node(start, end);
        return true;
    }
    
    return this.root.insert(new Node(start, end)); 
};

/** 
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */