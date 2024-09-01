/*
There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you.
You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules
of this new language. Derive the order of letters in this language.
Input:
[
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
]
Output: "wertf"

Topological sort - graph

Time Complexity: O(V + E)
The time it takes to build a graph would be O(E) since we need to traverse through all the edges and initializing
a queue that has vertices w in-degree 0 would take O(V) assuming we have V vertices.
Lastly, dequeue and output the vertices would take O(V) as well since dequeueing and outputting each vertex are linear time.

Space Complexity: O(V)
The memory needed for this problem would be the in-degree array and a dictionary containing all the
vertices as keys and vertices they're sourcing to as values. Both would take O(V)

https://leetcode.com/problems/alien-dictionary/description/
*/

// Option 1
const alienOrder = words => {
  let graph = {};
  // We´ll check who is the root based on the degree
  // the ones with zero is the roots
  let count = {}

  for (let word of words) {
    for (let i = 0; i < word.length; i++) {
        let c = word[i];
        graph[c] = new Array();
        count[c] = 0;
    }
  }

  // 1. Find all edges in the graph
  for (let i = 0; i < words.length - 1; i++) {
    let parent = words[i];
    let child = words[i + 1];
    // Check if child word is not a prefix of parent
    if (parent.length > child.length && parent.startsWith(child)) {
        return "";
    }
    // Find the first non matching character to find the relationship of those
    let min = Math.min(parent.length, child.length);
    for (let j = 0; j < min; j++) {
        let parentChar = parent[j];
        let childChar = child[j];
        if (parentChar !== childChar) {
            // As this is sorted and parent comes first, the first non ocurrence means
            // that the parentChar has higher priority than childChar
            graph[parentChar].push(childChar);
            // Count
            count[childChar]++;
            // There's no need to analyze the rest as the result does not change for the
            // rest of characters
            break;
        }
    }
  }

  /* Graph
    {
      w: Set(1) { 'e' },
      r: Set(1) { 't' },
      t: Set(1) { 'f' },
      f: Set(0) {},
      e: Set(1) { 'r' }
    }
  */

  // 2. Run BFS
  let queue = [];
  // Identify the root node
  for (let c in graph) {
    // Get the chars with degree zero of the graph
    // These are potential root nodes with better order
    if (count[c] === 0) {
        queue.push(c)
    }
  }

  let result = '';

  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
        let node = queue.shift();
        result += node;
        for (let neighbor of graph[node]) {
            count[neighbor]--;
            if (count[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
  }

  return result.length < Object.keys(graph).length ? "" : result;
}




// Option 2
const alienOrder = words => {
  let graph = {};
  // We´ll check who is the root based on the degree
  degree = new Array(26).fill(0); // a = 0, b = 1, c = 2, ..., z = 26
  buildGraph(graph, words, degree);
  /*
  {
    w: Set { 'e' },
    r: Set { 't' },
    t: Set { 'f' },
    f: Set {},
    e: Set { 'r' }
  }
  */
 return bfs(graph, degree);
}

function buildGraph(graph, words, degree) {
  // Each character is a node in the graph
  for(let word of words) {
    for(let i = 0; i < word.length; i++) {
      let c = word[i];
      if(!(c in graph)) {
        graph[c] = new Set();
      }
    }
  }
  
  for(let i = 1; i < words.length; i++) {
    // We already know that the original array is sorted based on the program
    // so we need to find which character comes first, we neeed to look for the
    // first two words and start comparing elements
    let firstWord = words[i - 1];
    let secondWord = words[i];
    let min = Math.min(firstWord.length, secondWord.length);

    // Let´s take the smallest word to compare characters
    for(let j = 0; j < min; j++) {
      if(firstWord[j] !== secondWord[j]) {
        let parent = firstWord[j];
        let child = secondWord[j];

        if(!graph[parent].has(child)) {
          graph[parent].add(child);
          // Get the ascii number based on the char to identify
          // the root
          let n = child.charCodeAt(0);
          degree[n - 97]++;
        }
        // We only need to check the first different char
        // so there´s no need to look for the rest for the others
        // that´s why we break the loop
        break;
      }
    }
  }
}

const bfs = (graph, degree) => {
  let result = '';
  const totalChars = Object.keys(graph).length;
  let queue = [];

  console.log(graph);
  console.log(degree);

  // Identify root node
  for(let c in graph) {
    // Get the chars with degree zero of the graph
    // These are potential root nodes with better order
    let d = c.charCodeAt(0);
    if(degree[d - 97] === 0) {
      queue.push(c);
    }
  }

  while(queue.length) {
    let size = queue.length;
    for(let i = 0; i < size; i++) {
      let node = queue.shift();
      result += node;
      // Get neighbor nodes
      for(let neighbor of graph[node]) {
        let n = neighbor.charCodeAt(0);
        degree[n - 97]--;
        if(degree[n - 97] === 0) {
          queue.push(neighbor);
        }
      }
    }
  }
  return result.length === totalChars ? result : '';
}

words = ["wrt", "wrf", "er", "ett", "rftt"]; // output = "wertf"
// words = ["z","x"] // output = "zx"
// words = ["z","x","z"]  // output = ""
// words = ["abc","ab"]; // output = ""
// words = ["z","z"]; // output = "z"
console.log(alienOrder(words));