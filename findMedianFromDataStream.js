/*
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0

https://leetcode.com/problems/find-median-from-data-stream/description
*/

// Adding and removing from the heap is O(logN)
// For a max heap, getting the max value is O(1)
// For a min heap, getting the max value is O(1)
// We will always try to keep them balance
var MedianFinder = function () {
  // It has values less or equal the large heal
  this.smallHeap = new PriorityQueue({
    compare: (a, b) => b - a,
  });
  // These has the values greater or equal the max of the max heap
  this.largeHeap = new PriorityQueue({
    compare: (a, b) => a - b,
  });
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  // Always push to the small heap
  this.smallHeap.enqueue(num);

  // If the value of the small heap is greater than the large heap, update
  if (this.smallHeap.front() > this.largeHeap.front()) {
    this.largeHeap.enqueue(this.smallHeap.dequeue());
  }

  // Uneven sizes, try to get them as even as possible (difference bigger than 1)
  if (this.smallHeap.size() > this.largeHeap.size() + 1) {
    this.largeHeap.enqueue(this.smallHeap.dequeue());
  } else if (this.largeHeap.size() > this.smallHeap.size() + 1) {
    this.smallHeap.enqueue(this.largeHeap.dequeue());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.smallHeap.size() > this.largeHeap.size()) {
    return this.smallHeap.front();
  }
  if (this.largeHeap.size() > this.smallHeap.size()) {
    return this.largeHeap.front();
  }
  // Even heaps
  return (this.smallHeap.front() + this.largeHeap.front()) / 2;
};

// Java
/*
public class MedianFinder {
    // Smaller elements but we want maxHeap implementation
    // We want the larger elements
    PriorityQueue<Integer> maxHeap;
    // Larger elements but we want minHeap implementation
    // Get the smallet element from Min heap
    PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        minHeap = new PriorityQueue<>();
        maxHeap = new PriorityQueue<>(new Comparator<Integer>() {
            public int compare(Integer i1, Integer i2) {
                return i2 - i1;
            }
        });
    }

    // Adds a number into the data structure.
    public void addNum(int num) {
        minHeap.offer(num);
        maxHeap.offer(minHeap.poll());
        if (minHeap.size() < maxHeap.size()) {
            minHeap.offer(maxHeap.poll());
        }
    }

    // Returns the median of current data stream
    public double findMedian() {
        return minHeap.size() > maxHeap.size() ? minHeap.peek() : (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}

*/