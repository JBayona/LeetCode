/*
You're a restaurant manager who's job is to find available time windows for seating N number of guest(s).
Lets assume your restaruant is specified in the following way:

restaurant = {
'restaurant_start': 9,
'restaurant_end': 22,
'capacity': 5,
'reservations': [
{'start': 10, 'end': 14, 'ppl': 3},
{'start': 11, 'end': 13, 'ppl': 2},
{'start': 13.5, 'end': 15, 'ppl': 1},
{'start': 16, 'end': 20, 'ppl': 2}
]
}

Where restaurant_start and restaurant_end are the open and close times of the resturant, capacity is
the maximum number people the restaurant can fit at any point, and reservations are existing reservations w/ guests (e.g ppl is the number of customers who are already at the restaurant at that time interval).

Write an algorithm that can output all available time intervals for seating an input N guests
from restaurant open to close (e.g [[9,11],....]]). Assume your input to the function is in the format
of the restaurant dictionary object specified above along with a parameter N indicating the number of people to seat.
*/

class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }

  // Helper method to get the parent index
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // Helper method to get the left child index
  leftChildIndex(index) {
    return 2 * index + 1;
  }

  // Helper method to get the right child index
  rightChildIndex(index) {
    return 2 * index + 2;
  }

  // Helper method to swap two elements in the heap
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // Method to insert an element
  enqueue(element) {
    this.heap.push(element);
    this.bubbleUp();
  }

  // Method to remove and return the element with the highest priority
  dequeue() {
    if (this.isEmpty()) return null;

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return root;
  }

  // Method to move the last element up to maintain the heap property
  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIdx = this.parentIndex(index);

      if (this.comparator(this.heap[index], this.heap[parentIdx]) >= 0) {
        break;
      }

      this.swap(index, parentIdx);
      index = parentIdx;
    }
  }

  // Method to move the root element down to maintain the heap property
  bubbleDown() {
    let index = 0;

    while (this.leftChildIndex(index) < this.heap.length) {
      const leftChildIdx = this.leftChildIndex(index);
      const rightChildIdx = this.rightChildIndex(index);
      let smallerChildIdx = leftChildIdx;

      if (
        rightChildIdx < this.heap.length &&
        this.comparator(this.heap[rightChildIdx], this.heap[leftChildIdx]) < 0
      ) {
        smallerChildIdx = rightChildIdx;
      }

      if (this.comparator(this.heap[index], this.heap[smallerChildIdx]) <= 0) {
        break;
      }

      this.swap(index, smallerChildIdx);
      index = smallerChildIdx;
    }
  }

  // Method to check if the priority queue is empty
  isEmpty() {
    return this.heap.length === 0;
  }

  // Method to get the element with the highest priority without removing it
  front() {
    return this.isEmpty() ? null : this.heap[0];
  }

  // Method to get the size of the priority queue
  size() {
    return this.heap.length;
  }
}

class ReservationScheduler {
  constructor(restaurant) {
    this.heap = this.init(restaurant["reservations"]);
    this.cap = restaurant["capacity"];
    this.opening = restaurant["restaurant_start"];
    this.close = restaurant["restaurant_end"];
    this.currCap = restaurant["capacity"];
  }
  init(reservations) {
    let heap = new PriorityQueue((a, b) => a.time - b.time);
    for (let reservation in reservations) {
      let start = reservations[reservation].start;
      let end = reservations[reservation].end;
      let ppl = reservations[reservation].ppl;
      // Decrement at entry
      heap.enqueue({ time: start, ppl: -ppl });
      // Increment at leave
      heap.enqueue({ time: end, ppl: ppl });
    }
    return heap;
  }
  availableSlots(n) {
    if (n > this.cap) {
      return [];
    }

    let prev = this.opening;
    let currCap = this.cap;
    let intervals = [];
    while (!this.heap.isEmpty()) {
      let reservation = this.heap.dequeue();
      // while the time is within the boundaries and we still have capacity
      // current cap specifies how many people we can receive and "n" is the number
      // of ppl we want to find place
      if (reservation.time >= prev && reservation.time < this.close && currCap >= n) {
        intervals.push([prev, reservation.time]);
      }
      // Always + as we have negative signs
      currCap += reservation.ppl;
      prev = reservation.time;
    }

    // Check last time for closing, it should have capacity to
    // receive more people as everyone was already dispatched
    if (prev < this.close) {
      intervals.push([prev, this.close]);
    }

    // Merge Interval
    let result = [];
    // This is already sorted
    prev = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
      let interval = intervals[i];
      // If the end of the prev interval is greater than the start
      // of the current interval, it means we have an override
      if (prev[1] >= interval[0]) {
        prev = [prev[0], Math.max(prev[1], interval[1])];
      } else {
        result.push(prev);
        prev = interval;
      }
    }
    // The last missing one
    result.push(prev);
    return result;
  }
}

restaurant = {
  restaurant_start: 9,
  restaurant_end: 22,
  capacity: 5,
  reservations: [
    { start: 10, end: 14, ppl: 3 },
    { start: 11, end: 13, ppl: 2 },
    { start: 13.5, end: 15, ppl: 1 },
    { start: 16, end: 20, ppl: 2 },
  ],
};

let obj = new ReservationScheduler(restaurant);
console.log(obj.availableSlots(5));
