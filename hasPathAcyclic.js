/*
Has path, given a graph and a source and destination node. Find if it´s possible to travel from src
to destination.
Assume the graph is acyclic.
*/
// DFS
const hasPathDFS = (graph, src, dst) => {
  if(src === dst) {
    return true;
  }
  for(let neighbor of graph[src]) {
    if(hasPathDFS(graph, neighbor, dst)) {
      return true;
    }
  }
  return false;
}

// BFS
const hasPathBFS = (graph, src, dst) => {
  let queue = [src];
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      if (node === dst) {
        return true;
      }
      for (let neighbor of graph[node]) {
        queue.push(neighbor);
      }
    }
  }
  return false;
};

const graph = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
};
const src = "f";
const dst = "k";
console.log(hasPathDFS(graph, src, dst));
console.log(hasPathBFS(graph, src, dst));
