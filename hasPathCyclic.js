/*
Has path, given a graph and a source and destination node. Find if it´s possible to travel from src
to destination.
*/
/*
{
  i: [ 'j', 'k' ],
  j: [ 'i' ],
  k: [ 'i', 'm', 'l' ],
  m: [ 'k' ],
  l: [ 'k' ],
  n: [ 'o' ],
  o: [ 'n' ]
}
*/

// DFS
const undirectedPathDFS = (edges, src, dst) => {
  const graph = buildGraph(edges);
  let visited = new Set();
  return hasPathDFS(graph, visited, src, dst);
}

const hasPathDFS = (graph, visited, src, dst) => {
  // Base cases
  if(src === dst) {
    return true;
  }
  if(visited.has(src)) {
    return false;
  }

  visited.add(src);

  for(let neighbor of graph[src]) {
    if(hasPathDFS(graph, visited, neighbor, dst)) {
      return true;
    }
  }
  return false;
}

// BFS
const undirectedPathBFS = (edges, src, dst) => {
  const graph = buildGraph(edges);
  let visited = new Set();
  return hasPathBFS(graph, visited, src, dst);
}

const hasPathBFS = (graph, visited, src, dst) => {
  let queue = [src];
  while(queue.length) {
    let size = queue.length;
    for(let i = 0; i < size; i++) {
      let node = queue.shift();
      // We found the node
      if(dst === node) {
        return true;
      }
      // If the node has been visited, we 
      // just need to skip it and look for others
      if(visited.has(node)) {
        continue;
      }
      visited.add(node);
      for(let neighbor of graph[node]) {
        queue.push(neighbor);
      }
    }
  }
  return false;
}

const buildGraph = edges => {
  const graph = {};
  for(let edge of edges) {
    const [from, to] = edge;
    if(!(from in graph)) {
      graph[from] = [];
    }
    if(!(to in graph)) {
      graph[to] = [];
    }
    graph[from].push(to);
    graph[to].push(from);
  }
  return graph;
}

const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["n", "o"]
];
const src = "j";
const dst = "m";
console.log(undirectedPathDFS(edges, src, dst));
console.log(undirectedPathBFS(edges, src, dst));
