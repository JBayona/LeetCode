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
var MyCalendar = function () {
  this.bookings = []; // List to store all the booked events
};

MyCalendar.prototype.book = function (start, end) {
  // Check for overlaps with previously booked events
  for (let event of this.bookings) {
    let [existingStart, existingEnd] = event;

    // If there is an overlap, return false
    if (start < existingEnd && end > existingStart) {
      return false;
    }
  }
  // No overlap, add the event to the bookings
  this.bookings.push([start, end]);
  return true;
};

// Option 2
var MyCalendar = function () {
  this.root = null;
};

class Node {
  constructor(start, end, left = null, right = null) {
    this.start = start;
    this.end = end;
    this.left = left;
    this.right = right;
  }
  insert(node) {
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

MyCalendar.prototype.book = function (start, end) {
  // First element
  if (!this.root) {
    this.root = new Node(start, end);
    return true;
  }

  return this.root.insert(new Node(start, end));
};
