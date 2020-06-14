/*
There is a new alien language which uses the latin alphabet. However, the order among letters
are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted
lexicographically by the rules of this new language. Derive the order of letters in this language.

Example 1:
Given the following words in dictionary,
[
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
]
The correct order is: "wertf".

Example 2:
Given the following words in dictionary,
[
  "z",
  "x"
]
The correct order is: "zx".

Example 3:
Given the following words in dictionary,
[
  "z",
  "x",
  "z"
]
The order is invalid, so return "".

// Topological sort

Topological ordering is possible if and only if the graph has no directed cycles
(DAG - directed acyclic graph)

Derive the order of letters in this language
=> get topological sort of all letters

Wrap up:
Build the graph
Topological sorting

En un diccionario normal cómo sabemos cuál va primero?
Por la primer letra diferente
Ejemplo: “azd” y “zad”, sabemos que primero va azd porque encontramos la
primera letra diferente entre los caracteres que es “a" y “z", “a" es menor por lo que sabemos
que “azd” va primero, en este ejemplo:

Words = [“wrtf”, “wrf”, “er”, “ett”, “rftt” ] => ya están ordenados

wrtf y wrf = comparando el primer carácter diferente, “t" va antes que “f”
wrf y er = “w” va antes que “e”
er y ett = “r” va antes que “t”
ett y rfft = “e” va antes que “r”
Entonces el orden final es => w, e, r, t, f

Time complexity:
Say the number of characters in the dictionary (including duplicates) is n.
Building the graph takes O(n). Topological sort takes O(V + E). V <= n.
E also can't be larger than n. So the overall time complexity is O(n).

https://www.youtube.com/watch?v=LA0X_N-dEsg
*/

function alienOrder(words) {
    inDegree = new Array(26).fill(0); // a = 0, b = 1, c = 2, ..., z = 26
    graph = {};
    buildGraph(graph, words, inDegree);
    // Topological sort
    return bfs(graph, inDegree);
  }
  
  function buildGraph(graph, words, inDegree) {
    for(let word of words) {
      for(let i = 0; i < word.length; i++) {
        let c = words[i];
        graph[c] = new Set();
      }
    }
  
    // Check for every single word
    for(let i = 1; i < words.length; i++) {
      // First should be the first element as the words are
      // sorted, so the first different char of first goes
      // before the first different char of second
      let first = words[i - 1];
      let second = words[i];
      let len = Math.min(first.length, second.length);
  
      // We need to find the first different character, so
      // we need to iterate the string with the smalles length
      for(let j = 0; j < len; j++) {
        if(first[j] !== second[j]) {
          let out = first[j];
          let in = second[j];
  
          if(!graph[out].has(in)) {
            graph[out].add(in);
            inDegree[in - 97]++; // 97 = a
          }
          // We only need to get the first different char
          // so no need to look for the others, that's
          // why we break the loop
          break;
        }
      }
    }
  }
  
  function bfs(graph, inDegree) {
    let result = '';
    let totalChars = Object.keys(graph).length;
    let queue = [];
  
    for(let c in graph) {
      // Get the chars with degree zero
      if(inDegree[c - 97] === 0) {
        result += c;
        queue.push(c);
      }
    }
  
    while(queue.length) {
      let size = queue.length;
      for(let i = 0; i < size; i++) {
        let node = queue.shift();
        for(let neigh of graph[node]) {
          inDegree[neigh - 97]--;
          if(inDegree[neigh - 97] === 0) {
            queue.push(neigh);
            result += neigh;
          }
        }
      }
    }
  
    return result.length === totalChars ? result : "";
  }