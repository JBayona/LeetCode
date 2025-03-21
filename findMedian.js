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
// Add element O(logN)
// Remove element O(logN)
// Find O(1)
/*
    Small Heap.    Large Heap
    Max heap.      Min Heap
    [1, 2].        [3, 4]
        (2 + 3) / 2 = 2.5
*/
var MedianFinder = function() {
  // It has values less or equal the large heap
  this.maxHeap = new PriorityQueue({
      compare: (a, b) => b - a
  });
  // These has the values greater or equal the max of the max heap
  this.minHeap = new PriorityQueue({
      compare: (a, b) => a - b
  });
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function(num) {
  this.minHeap.enqueue(num);
  this.maxHeap.enqueue(this.minHeap.dequeue());
  if (this.minHeap.size() < this.maxHeap.size()) {
      this.minHeap.enqueue(this.maxHeap.dequeue());
  }
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function() {
  return this.minHeap.size() > this.maxHeap.size() ? this.minHeap.front() : (this.maxHeap.front() + this.minHeap.front()) / 2.0;
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
