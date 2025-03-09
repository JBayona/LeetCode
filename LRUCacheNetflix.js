/*
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it 
should invalidate the least recently used item before inserting a new item.

Follow up:
Could you do both operations in O(1) time complexity?

https://leetcode.com/problems/lru-cache/description/
*/

/**

General idea:
1. The head always has the most recent nodde.
2. Whenever we apply an operation on the node, we need to update the pointers
3. The map is used to store the key and the node
4. The node has a key, value, prev and next pointers
5. The head node has prev as null
6. The end node has next as null
7. The head node is the most recent node
8. The end node is the least recent node
9. The size is the capacity of the cache

- HEAD node has prev as null
- END/TAIL node has next as null
        HEAD                          END
            next.     next.      next.    next
 null    2   ->    4    ->   3    ->   1   -> null
      <-     <-        <-         <-
      prev.  prev.     prev.    prev.    
 */

var LRUCache = function (capacity) {
  this.head = null;
  this.end = null;
  this.size = capacity;
  this.map = new Map();
};

class Node {
  constructor(key, val) {
    this.key = key;
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

/*Utility functions*/
LRUCache.prototype.remove = function (node) {
  /*
              If node.prev is not null, that means that the node to
              remove is not the head node, so we need to update the
              pointers
              */
  // Update node's prev pointers
  if (node.prev !== null) {
    node.prev.next = node.next;
  } else {
    // This means we want to remove the head, so
    // in the meantime we update the head to point
    // to the node after the head
    this.head = node.next;
  }

  // Update node's next pointers
  // If there's a node we point from the node we want to remove
  // we update the pointers from both excluding the node we are removing
  if (node.next !== null) {
    node.next.prev = node.prev;
  } else {
    // If the node to delete is the latest node
    // we need to update the pointer too
    this.end = node.prev;
  }
};

LRUCache.prototype.setHead = function (node) {
  /*Cada que creamos un nueno nodo, el next debe
            apuntar al head, que es el nodo anterior
            mas "actual"*/
  node.next = this.head;
  /*El prev es null porque no hay nodos mas
            recuentes en ese momento*/
  node.prev = null;
  // As we have a new node, we need to update
  // the "old new" node to point to the new node
  if (this.head !== null) {
    this.head.prev = node;
  }
  /*El nuevo head es nuestro nodo*/
  this.head = node;
  /*Si es el primer nodo, entonces end
            debe tener el head también que es el
            mismo nodo*/
  if (this.end === null) {
    this.end = this.head;
  }
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    let node = this.map.get(key);
    this.remove(node);
    this.setHead(node);
    return node.value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    let old = this.map.get(key);
    old.value = value;
    this.remove(old);
    this.setHead(old);
  } else {
    let created = new Node(key, value);
    if (this.map.size >= this.size) {
      this.map.delete(this.end.key);
      this.remove(this.end);
      this.setHead(created);
    } else {
      this.setHead(created);
    }
    this.map.set(key, created);
  }
};

let cache = new LRUCache(3);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
cache.put(4, 4);
console.log(cache.get(3));
console.log(cache.get(2));
console.log(cache.get(1));
console.log(cache.get(4));
