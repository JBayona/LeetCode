/*
1. Comparator Functionality: The PriorityQueue constructor accepts a comparator function, allowing you to define how elements are compared.
By default, it sorts based on a priority property, but you can modify this to fit your needs.
2. enqueue(element): Adds an element to the queue. The element can be any object, and the priority is determined by the comparator.
3. dequeue(): Removes and returns the element with the highest priority according to the comparator.
4. peek(): Returns the element with the highest priority without removing it.
5. isEmpty(): Checks if the priority queue is empty.
*/

// Option 1
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
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
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

            if (rightChildIdx < this.heap.length && this.comparator(this.heap[rightChildIdx], this.heap[leftChildIdx]) < 0) {
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

var minMeetingRooms = function(intervals) {
    if (!intervals) {
        return 0;
    }

    // Sort based on the start time
    // 0 - start
    // 1 - end
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Set-up a priority queue to get the earlist end time a meeting end
    let minHeap = new PriorityQueue((a, b) => a - b);
    // Add the first meeting to the heap
    minHeap.enqueue(intervals[0][1]);
    for(let i = 1; i < intervals.length; i++) {
        // No conflict, the earliest meeting ends first to the next
        // meeting start time so we can remove it from the heap
        if (minHeap.front() <= intervals[i][0]) {
            minHeap.dequeue();
        }
        // Add the next meeting schedule
        minHeap.enqueue(intervals[i][1]);
    }
    return minHeap.size();
};

// let intervals = [[0,30],[5,10],[15,20]]; // 2
let intervals = [[7,10],[2,4]]; // 1
console.log(minMeetingRooms(intervals));

// Set-up a priority queue to get the earlist end time a meeting end
let minHeap = new PQ({
    compare: (a, b) => a - b
});

// Option 2
class PQ {
    /**
     * Creates a priority queue
     * @public
     * @params {object} [options]
     */
    constructor(options = {}) {
      const { priority, compare } = options;
      if (compare) {
        if (typeof compare !== 'function') {
          throw new Error('.constructor expects a valid compare function');
        }
        this._compare = compare;
        this._heap = new CustomHeap(this._compare);
      } else {
        if (priority !== undefined && typeof priority !== 'function') {
          throw new Error('.constructor expects a valid priority function');
        }
  
        this._priority = priority || ((el) => +el);
      }
    }
  
    /**
     * @private
     * @returns {object}
     */
    _getElementWithPriority(node) {
      return {
        priority: node.key,
        element: node.value
      };
    }
  
    /**
     * @public
     * @returns {number}
     */
    size() {
      return this._heap.size();
    }
  
    /**
     * @public
     * @returns {boolean}
     */
    isEmpty() {
      return this._heap.isEmpty();
    }
  
    /**
     * Returns an element with highest priority in the queue
     * @public
     * @returns {object}
     */
    front() {
      if (this.isEmpty()) return null;
  
      if (this._compare) {
        return this._heap.root();
      }
  
      return this._getElementWithPriority(this._heap.root());
    }
  
    /**
     * Returns an element with lowest priority in the queue
     * @public
     * @returns {object}
     */
    back() {
      if (this.isEmpty()) return null;
  
      if (this._compare) {
        return this._heap.leaf();
      }
  
      return this._getElementWithPriority(this._heap.leaf());
    }
  
    /**
     * Adds an element to the queue
     * @public
     * @param {any} element
     * @param {number} p - priority
     * @throws {Error} if priority is not a valid number
     */
    enqueue(element, p) {
      if (this._compare) {
        this._heap.insert(element);
        return this;
      }
  
      if (p && Number.isNaN(+p)) {
        throw new Error('.enqueue expects a numeric priority');
      }
  
      if (Number.isNaN(+p) && Number.isNaN(this._priority(element))) {
        throw new Error(
          '.enqueue expects a numeric priority '
          + 'or a constructor callback that returns a number'
        );
      }
  
      const priority = !Number.isNaN(+p) ? p : this._priority(element);
      this._heap.insert(+priority, element);
      return this;
    }
  
    /**
     * Removes and returns an element with highest priority in the queue
     * @public
     * @returns {object}
     */
    dequeue() {
      if (this.isEmpty()) return null;
  
      if (this._compare) {
        return this._heap.extractRoot();
      }
  
      return this._getElementWithPriority(this._heap.extractRoot());
    }
  
    /**
     * Returns a sorted list of elements from highest to lowest priority
     * @public
     * @returns {array}
     */
    toArray() {
      if (this._compare) {
        return this._heap.clone().sort().reverse();
      }
  
      return this._heap
        .clone()
        .sort()
        .map((n) => this._getElementWithPriority(n))
        .reverse();
    }
  
    /**
     * Clears the queue
     * @public
     */
    clear() {
      this._heap.clear();
    }
  }
  
  class Heap {
    /**
     * Creates a heap instance
     * @param {array<string|number|object>} nodes
     * @param {string|number|object} [leaf]
     * @returns {number}
     */
    constructor(nodes, leaf) {
      this._nodes = Array.isArray(nodes) ? nodes : [];
      this._leaf = leaf || null;
    }
  
    /**
     * Checks if a parent has a left child
     * @private
     * @param {number} parentIndex
     * @returns {boolean}
     */
    _hasLeftChild(parentIndex) {
      const leftChildIndex = (parentIndex * 2) + 1;
      return leftChildIndex < this.size();
    }
  
    /**
     * Checks if a parent has a right child
     * @private
     * @param {number} parentIndex
     * @returns {boolean}
     */
    _hasRightChild(parentIndex) {
      const rightChildIndex = (parentIndex * 2) + 2;
      return rightChildIndex < this.size();
    }
  
    /**
     * Returns heap node's key
     * @private
     * @param {object|number|string} node
     * @returns {number|string}
     */
    _getKey(node) {
      if (typeof node === 'object') return node.key;
      return node;
    }
  
    /**
     * Swaps two nodes in the heap
     * @private
     * @param {number} i
     * @param {number} j
     */
    _swap(i, j) {
      const temp = this._nodes[i];
      this._nodes[i] = this._nodes[j];
      this._nodes[j] = temp;
    }
  
    /**
     * Compares parent & child nodes
     * and returns true if they are in right positions
     *
     * @private
     * @param {object|number|string} parent
     * @param {object|number|string} child
     * @returns {boolean}
     */
    _compare(parentNode, childNode) {
      return this._compareKeys(
        this._getKey(parentNode),
        this._getKey(childNode)
      );
    }
  
    /**
     * Checks if parent and child nodes should be swapped
     * @private
     * @param {number} parentIndex
     * @param {number} childIndex
     * @returns {boolean}
     */
    _shouldSwap(parentIndex, childIndex) {
      if (parentIndex < 0 || parentIndex >= this.size()) return false;
      if (childIndex < 0 || childIndex >= this.size()) return false;
  
      return !this._compare(
        this._nodes[parentIndex],
        this._nodes[childIndex]
      );
    }
  
    /**
     * Bubbles a node from a starting index up in the heap
     * @param {number} startingIndex
     * @public
     */
    heapifyUp(startingIndex) {
      let childIndex = startingIndex;
      let parentIndex = Math.floor((childIndex - 1) / 2);
  
      while (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
        childIndex = parentIndex;
        parentIndex = Math.floor((childIndex - 1) / 2);
      }
    }
  
    /**
     * Compares left and right & children of a parent
     * @private
     * @param {number} parentIndex
     * @returns {number} - a child's index
     */
    _compareChildrenOf(parentIndex) {
      if (
        !this._hasLeftChild(parentIndex)
        && !this._hasRightChild(parentIndex)
      ) {
        return -1;
      }
  
      const leftChildIndex = (parentIndex * 2) + 1;
      const rightChildIndex = (parentIndex * 2) + 2;
  
      if (!this._hasLeftChild(parentIndex)) {
        return rightChildIndex;
      }
  
      if (!this._hasRightChild(parentIndex)) {
        return leftChildIndex;
      }
  
      const isLeft = this._compare(
        this._nodes[leftChildIndex],
        this._nodes[rightChildIndex]
      );
  
      return isLeft ? leftChildIndex : rightChildIndex;
    }
  
    /**
     * Pushes a node from a starting index down in the heap
     * @private
     */
    _heapifyDown(startingIndex) {
      let parentIndex = startingIndex;
      let childIndex = this._compareChildrenOf(parentIndex);
  
      while (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
        parentIndex = childIndex;
        childIndex = this._compareChildrenOf(parentIndex);
      }
    }
  
    /**
     * Removes and returns the root node in the heap
     * @public
     * @returns {object}
     */
    extractRoot() {
      if (this.isEmpty()) return null;
  
      const root = this.root();
      this._nodes[0] = this._nodes[this.size() - 1];
      this._nodes.pop();
      this._heapifyDown(0);
  
      if (root === this._leaf) {
        this._leaf = this.root();
      }
  
      return root;
    }
  
    /**
     * Pushes a node with down in the heap before an index
     * @private
     * @param {number} index
     */
    _heapifyDownUntil(index) {
      let parentIndex = 0;
      let leftChildIndex = 1;
      let rightChildIndex = 2;
      let childIndex;
  
      while (leftChildIndex < index) {
        childIndex = this._compareChildrenBefore(
          index,
          leftChildIndex,
          rightChildIndex
        );
  
        if (this._shouldSwap(parentIndex, childIndex)) {
          this._swap(parentIndex, childIndex);
        }
  
        parentIndex = childIndex;
        leftChildIndex = (parentIndex * 2) + 1;
        rightChildIndex = (parentIndex * 2) + 2;
      }
    }
  
    /**
     * Returns a shallow copy of the heap
     * @protected
     * @param {class} HeapType
     * @returns {Heap}
     */
    _clone(HeapType) {
      return new HeapType(this._nodes.slice(), this._leaf);
    }
  
    /**
     * Sorts the heap by swapping root with all nodes and fixing positions
     * @public
     * @returns {array} the sorted nodes
     */
    sort() {
      for (let i = this.size() - 1; i > 0; i -= 1) {
        this._swap(0, i);
        this._heapifyDownUntil(i);
      }
  
      return this._nodes;
    }
  
    /**
     * Inserts a node in the right position into the heap
     * @public
     * @param {number|string} key
     * @param {any} [value]
     * @returns {Heap}
     */
    insert(key, value) {
      const newNode = value !== undefined ? { key, value } : key;
      this._nodes.push(newNode);
      this.heapifyUp(this.size() - 1);
      if (this._leaf === null || !this._compare(newNode, this._leaf)) {
        this._leaf = newNode;
      }
      return this;
    }
  
    /**
     * Fixes all positions of the nodes in the heap
     * @public
     * @returns {Heap}
     */
    fix() {
      for (let i = 0; i < this.size(); i += 1) {
        this.heapifyUp(i);
      }
      return this;
    }
  
    /**
     * Verifies that the heap is valid
     * @public
     * @returns {boolean}
     */
    isValid() {
      const isValidRecursive = (parentIndex) => {
        let isValidLeft = true;
        let isValidRight = true;
  
        if (this._hasLeftChild(parentIndex)) {
          const leftChildIndex = (parentIndex * 2) + 1;
          isValidLeft = this._compare(
            this._nodes[parentIndex],
            this._nodes[leftChildIndex]
          );
  
          if (!isValidLeft) {
            return false;
          }
  
          isValidLeft = isValidRecursive(leftChildIndex);
        }
  
        if (this._hasRightChild(parentIndex)) {
          const rightChildIndex = (parentIndex * 2) + 2;
          isValidRight = this._compare(
            this._nodes[parentIndex],
            this._nodes[rightChildIndex]
          );
  
          if (!isValidRight) {
            return false;
          }
  
          isValidRight = isValidRecursive(rightChildIndex);
        }
  
        return isValidLeft && isValidRight;
      };
  
      return isValidRecursive(0);
    }
  
    /**
     * Returns the root node in the heap
     * @public
     * @returns {object|number|string|null}
     */
    root() {
      if (this.isEmpty()) return null;
      return this._nodes[0];
    }
  
    /**
     * Returns a leaf node in the heap
     * @public
     * @returns {object|number|string|null}
     */
    leaf() {
      return this._leaf;
    }
  
    /**
     * Returns the number of nodes in the heap
     * @public
     * @returns {number}
     */
    size() {
      return this._nodes.length;
    }
  
    /**
     * Checks if the heap is empty
     * @public
     * @returns {boolean}
     */
    isEmpty() {
      return this.size() === 0;
    }
  
    /**
     * Clears the heap
     * @public
     */
    clear() {
      this._nodes = [];
      this._leaf = null;
    }
  
    /**
     * Convert a list of items into a heap
     * @protected
     * @static
     * @param {array} array
     * @param {class} HeapType
     * @returns {Heap}
     */
    static _heapify(list, HeapType) {
      if (!Array.isArray(list)) {
        throw new Error('.heapify expects an array');
      }
  
      return new HeapType(list).fix();
    }
  
    /**
     * Checks if a list of items is a valid heap
     * @protected
     * @static
     * @param {array} array
     * @param {class} HeapType
     * @returns {boolean}
     */
    static _isHeapified(list, HeapType) {
      return new HeapType(list).isValid();
    }
  }
  
  class CustomHeap extends Heap {
    constructor(comparator, nodes, leaf) {
      if (typeof comparator !== 'function') {
        throw new Error('CustomHeap expects a comparator function');
      }
      super(nodes, leaf);
      this._comparator = comparator;
    }
  
    /**
     * Compares parent & child nodes
     * and returns true if they are in right positions
     *
     * @private
     * @param {object|number|string} parent
     * @param {object|number|string} child
     * @returns {number}
     */
    _compare(parentNode, childNode) {
      return this._comparator(parentNode, childNode) <= 0;
    }
  
    /**
     * Returns child's index of two children before an index
     * @private
     * @param {number} index
     * @param {number} leftChildIndex
     * @param {number} rightChildIndex
     * @returns {number}
     */
    _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
      const compare = this._comparator(
        this._nodes[rightChildIndex],
        this._nodes[leftChildIndex]
      );
  
      if (compare <= 0 && rightChildIndex < index) {
        return rightChildIndex;
      }
  
      return leftChildIndex;
    }
  
    /**
     * Returns a shallow copy of the heap
     * @public
     * @returns {CustomHeap}
     */
    clone() {
      return new CustomHeap(
        this._comparator,
        this._nodes.slice(),
        this._leaf
      );
    }
  
    /**
     * Builds a custom heap from an array of items
     * @public
     * @static
     * @param {array} list
     * @param {function} comparator
     * @returns {CustomHeap}
     */
    static heapify(list, comparator) {
      if (!Array.isArray(list)) {
        throw new Error('.heapify expects an array');
      }
  
      if (typeof comparator !== 'function') {
        throw new Error('.heapify expects a comparator function');
      }
  
      return new CustomHeap(comparator, list).fix();
    }
  
    /**
     * Checks if a list of items is a valid custom heap
     * @public
     * @static
     * @param {array} list
     * @param {function} comparator
     * @returns {boolean}
     */
    static isHeapified(list, comparator) {
      if (!Array.isArray(list)) {
        throw new Error('.heapify expects an array');
      }
  
      if (typeof comparator !== 'function') {
        throw new Error('.isHeapified expects a comparator function');
      }
  
      return new CustomHeap(comparator, list).isValid();
    }
  }

