// BFS
// Time O(V + E)
const flattenJson = (json) => {
  let queue = [];
  let result = [];

  // First step, add everything in the queue
  for (let prop in json) {
    queue.push({ key: prop, val: json[prop] });
  }
  while (queue.length) {
    let node = queue.shift();
    // If the value is an Array
    if (Array.isArray(node.val)) {
      for (let elem of node.val) {
        queue.push({ key: `${node.key}`, val: elem });
      }
    } else if (typeof node.val === "object") {
      for (let prop in node.val) {
        queue.push({ key: `${node.key}.${prop}`, val: node.val[prop] });
      }
    } else {
      result.push([node.key, node.val]);
    }
  }
  return result;
};

const json = {
  a: 0,
  b: [1, 2, 3],
  c: { d: 4, e: 5 },
  f: 6,
  g: [{ h: [{ i: 7 }, { j: 8 }] }],
};
console.log(flattenJson(json));
