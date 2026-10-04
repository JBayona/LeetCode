/*
A company has tons of search queries with traffic. Based on the offline search log below:
chilli pepper, 1000
chilli pepper chicken, 500
fried
chilli pepper pork, 300
egg chilli pepper, 250
chilli pepper egg, 200
chilli pepper eggs, 100
chicken chilli pepper with beans, 70
chilli pepper chicken and beans, 50

Where the query is followed by the frequency of the query (comma separated)
It is helpful to understand the users' intentions before giving completion suggestions
when people are typing the query. Design a DS/algo to give suggestions for query completion.

Expected:
    Input: 'chilli pepper'
    Output: [
                ('chilli pepper', 1000)
                ('chilli pepper chicken', 500),
                ('chilli pepper pork', 300),
                ('chilli pepper egg', 200),
                ('chilli pepper eggs', 100),
                ('chilli pepper chicken and beans', 50),
    ]
    	
*/
// Time Complexity Adding a Word in Trie O(L) where L is the length of the word
// Space Complexity Iteration O(N) where N is the number of words in the trie
class Autocomplete {
  constructor(input) {
    this.trie = { children: {}, count: {}, isWord: false, value: null };
    // Initialize the trie
    this.init(input);
    this.prefix = '';
  }
  init(input) {
    for (let [word, frequency] of input) {
      this.addWord(word, frequency);
    }
  }
  addWord(word, frequency) {
    console.log(`Adding word: ${word} with frequency: ${frequency}`);
    let node = this.trie;
    // For each character in the word, add its children and the count with the entire word and
    // frequency so that way we can  get all words by each character typing
    for (let i = 0; i < word.length; i++) {
      let c = word[i];
      // find node or create new node
      node.children[c] = node.children[c] || { children: {}, count: {}, isWord: false, value: null };
      // Advance node
      node = node.children[c];
      // Count if exists, add it, otherwise set to zero and add the frequency
      // this wull help us get all the words at the char node if they are multiple words
      node.count[word] = (word in node.count) ? node.count[word] : frequency;
    }
    node.isWord = true;
    node.value = word;
  }
  getSuggestions(prefix) {
    // Find the prefix based on the pinput
    this.prefix += prefix;
    let node = this.trie;
    for (let i = 0; i < this.prefix.length; i++) {
      let c = this.prefix[i];
      // Check if the character exists in the trie
      if (!node.children[c]) {
        return [];
      }
      // Node found, we iterate over the node
      node = node.children[c];
    }
    // At this point, we should have found the node corresponding to the prefix. Now we can return the suggestions based on the counts.
    // Now to return the results we can do a sort based on the counts and return the results

    // Option 1 (N Log N): Sort the counts and return the results
    let suggestions = Object.entries(node.count).sort((a, b) => b[1] - a[1]).map(([word, frequency]) => [word, frequency]);

    // Option 2 (N): Use a priority queue to get the top K suggestions based on the counts
    // Add all elements in the Max Queue
    // Ascending order (Min Queue)`
    // let queue = new PriorityQueue((a, b) => a.frequency - b.frequency);
    // Descending order (Max Queue)
    let queue = new PriorityQueue((a, b) => b.frequency - a.frequency);
    for (let [word, frequency] of Object.entries(node.count)) {
      queue.enqueue({ word: word, frequency: frequency });
    }

    // Time Complexity: O(N log K) where N is the number of words in the trie and K is the number of suggestions we want to return
    let result = [];
    while (!queue.isEmpty()) {
      result.push(queue.dequeue());
    }

    return result;
  }
}

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

input = [
  ['chilli pepper chicken and beans', 50],
  ['chilli pepper chicken', 500],
  ['chilli pepper eggs', 100],
  ['chilli pepper pork', 300],
  ['chilli pepper egg', 200],
  ['chilli pepper', 1000]
];

let obj = new Autocomplete(input);
console.log(obj.getSuggestions('chilli pepper')); // should return the suggestions for 'chilli pepper'
