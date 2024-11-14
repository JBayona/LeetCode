/*
TC O(n lg K)
SC O(n-k+1)
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
  bubbleUp(index = this.heap.length - 1) {
    while (index > 0) {
      const parentIdx = this.parentIndex(index);

      if (this.comparator(this.heap[index], this.heap[parentIdx]) >= 0) {
        break;
      }

      this.swap(index, parentIdx);
      index = parentIdx;
    }
    return index;
  }

  // Method to move the root element down to maintain the heap property
  bubbleDown(index = 0) {
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
    return index;
  }

  remove(value) {
    const index = this.heap.indexOf(value);
    // If value is not in heap, return
    if (index === -1) {
      return undefined;
    }
    if (index === this.size() - 1) {
      return this.heap.pop();
    }
    this.swap(index, this.size() - 1);
    const val = this.heap.pop();
    this.bubbleDown(this.bubbleUp(index));
    return val;
  }

  contains(val) {
    return this.heap.indexOf(val) >= 0;
  }

  // Method to check if the priority queue is empty
  isEmpty() {
    return this.heap.length === 0;
  }

  // Method to get the element with the highest priority without removing it
  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }

  // Method to get the size of the priority queue
  size() {
    return this.heap.length;
  }
}

var medianSlidingWindow = function (nums, k) {
  // Keep track of the lower value of the median
  let maxHeap = new PriorityQueue((a, b) => b - a);
  // Keep track of the higher value of the median
  let minHeap = new PriorityQueue((a, b) => a - b);
  // For every element we need to do an adjustement
  // in our heaps, max heap keeps the min value of
  // the median and min heap the maximum
  let result = new Array(nums.length - k + 1);
  // Add k - 1 elements to the heap
  for (let i = 0; i < k - 1; i++) {
    maxHeap.enqueue(nums[i]);
    minHeap.enqueue(maxHeap.dequeue());
    if (maxHeap.size() + 1 < minHeap.size()) {
      maxHeap.enqueue(minHeap.dequeue());
    }
  }

  let index = 0;
  // Now iterate over all the remaining elements and find the rolling median
  for (let i = k - 1; i < nums.length; i++) {
    // Add the ith element
    maxHeap.enqueue(nums[i]);
    minHeap.enqueue(maxHeap.dequeue());
    if (maxHeap.size() + 1 < minHeap.size()) {
      maxHeap.enqueue(minHeap.dequeue());
    }
    // Example
    // [1  3  -1] -3  5  3  6  7  , k = 3
    // min heap = [1, 3]
    // max heap = [-1] as k = 3, we get the
    // median from min heap which is 1

    // get the median
    // if k is even number, as we keedp track on
    // both heaps, we need to pick them as divide
    if (k % 2 == 0) {
      result[index] = (maxHeap.peek() + minHeap.peek()) / 2.0;
    } else {
      // Get from minHeap as
      result[index] = minHeap.peek();
    }

    // In order to move the window we need
    // to remove the element from our heaps
    // the last one we check of the window
    // remove the left side j element
    if (minHeap.contains(nums[index])) {
      minHeap.remove(nums[index]);
    } else {
      maxHeap.remove(nums[index]);
    }
    index++;
  }
  return result;
};

let nums = [1, 3, -1, -3, 5, 3, 6, 7];
let k = 3;
console.log(medianSlidingWindow(nums, k));
