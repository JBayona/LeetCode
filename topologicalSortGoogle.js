/*
Me daban un numero de nodos, digamos 5. Me daban una lista de dependencias entre grafos, digamos
1 -> 3
3 -> 5
Significa que el nodo 1 debe estar antes que el 3 y el 3 tiene que estar antes que el 5
La solucion debe ser una lista de nodos del 1 al 5 donde esas restricciones se satisfagan
1 -> 3 -> 5 -> 2 -> 4 esta seria una posible solucion

First part;
Dadas esas restricciones, una lista que era invalida era 3 -> 1 -> 5 -> 2 -> 4
El 3 esta antes que el 1, viola la restriccion..
*/

function topologicalSort(n, connections) {
  let visited = new Array(n).fill(false);
  let stack = [];

  // Form graph
  let graph = {};
  for(let i = 0; i  < n; i++) {
    graph[i] = [];
  }

  for(let connection of connections) {
    let [from, to] = connection
    graph[from].push(to);
  }
  console.log('Graph');
  console.log(graph);

  // Call the recursive helper function to store topological
  // sort starting from all vertices one by one
  for(let i = 0; i < n; i++) {
    // Only if not visited
    if(visited[i] === false) {
      topologicalSortHelper(i, visited, stack, graph);
    }
  }

  // Now the stack has the element sorted based on topological sort
  console.log(stack);
  return stack
}

function topologicalSortHelper(node, visited, stack, graph) {
  // Mark the current node as visited
  visited[node] = true;

  // Check for all vertices adjacent to this node
  for(let v of graph[node]) {
    if(visited[v] === false) {
      topologicalSortHelper(v, visited, stack, graph)
    }
  }

  // Push to the current stack which will store the value
  stack.unshift(node);
}

let n = 6
let connections = [[5,2], [5,0], [4, 0], [4,1], [2,3], [3,1]];
// 5 4 2 3 1 0
console.log(topologicalSort(n, connections));

/* function Node(val, next) {
  this.val = val;
  this.next = next || null;
}

function topologicalSort(list, connections) {
  let hash = {};
  let current = list;
  let index = 0;
  // Add elements into current hash
  while(current) {
    hash[current.val] = index++;
    current = current.next;
  }
  console.log(hash);

  // Check if the restrictions are valid
  for(let connection of connections) {
    let [from, to] = connection;
    // Connection is not valid
    if(hash[to] < hash[from]) {
      return false;
    }
  }
  return true;
}

// 1->4->5->2->3
// list = new Node(1, new Node(4, new Node(5, new Node(2, new Node(3))))); // No valid
// 1->3->5->2->4
list = new Node(1, new Node(3, new Node(5, new Node(2, new Node(4))))); // Valid
connections = [[1,3], [3,5], [5,4],[2,4]];
console.log(topologicalSort(list, connections)); */