/*
ou are standing in line at a bank to open a bank account, there are M customers
ahead of you and the bank has N agents, Each agent takes time[i] to serve a customer.
If multiple agents are available, a customer will always choose the agent with the
lowest number. (i.e say agent 2,3,5 are available at some time, the next customer will
choose agent 2)


Find out how many minutes it will take for you to be served by an agent

M- number of customers 
N - number of agents 
times[i] -time ith agent takes to serve a customer 

eg: 
inputs: 
N = 4 
M = 5 
times = [2,3,1,5] 
output: 
2

explanation: 
at t = 0, 1st 4 customers will be attended to 
at t=1, agent 2 becomes available and serves customer 5 
at t=2 (agent,0 and agent 2 are available), you choose agent 0 and you are served
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

function getTimeBank(N, M, times) {
  let minHeap = new PriorityQueue((a, b) => a.time - b.time);

  for (let i = 0; i < times.length; i++) {
    // Time till now, increase time by, index of agent
    minHeap.enqueue({ time: times[i], increaseTimeBy: times[i], agent: i });
  }

  // M = customers
  for (let i = 0; i < M - N; i++) {
    let current = minHeap.dequeue();
    minHeap.enqueue({
      time: current.time + current.increaseTimeBy,
      increaseTimeBy: current.increaseTimeBy,
      agent: current.agent,
    });
  }

  // result[2] is the agent that will serve the customer C, result[0] is the time will take to serve
  // the customer C
  let result = minHeap.dequeue();
  return result.agent;
}

let N = 4;
let M = 5;
let times = [2, 3, 1, 5]; // Output 2

// let N = 4
// let M = 5
// let times = [99,99,99,2] // Output 3
console.log(getTimeBank(N, M, times));
