/*
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it 
should invalidate the least recently used item before inserting a new item.

Follow up:
Could you do both operations in O(1) time complexity?

https://leetcode.com/problems/lru-cache/description/
*/

class Node{
  constructor(key,val){
    this.key = key;
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

let LRUCache = function(capacity){
  this.map = new Map();
  this.head = null;
  this.end = null;
  this.size = capacity;
}

LRUCache.prototype.put = function(key,value){
  if(this.map.has(key)){
    let old = this.map.get(key);
    old.value = value;
    this.remove(old);
    this.setHead(old);
  }else{
    let created = new Node(key,value);
    if(this.map.size >= this.size){
      this.map.delete(this.end.key);
      this.remove(this.end);
      this.setHead(created);
    }else{
      this.setHead(created);
    }
    this.map.set(key, created);
  }
}

LRUCache.prototype.get = function(key) {
   if(this.map.has(key)){
    let node = this.map.get(key);
    this.remove(node);
    this.setHead(node);
    return node.value;
   }
   return -1;
};

LRUCache.prototype.remove = function(node){
  /*Al hacer el remove, el nodo más antiguo su
  next siempre apunta a null, entonces actualizamos
  el nodo siguiente (node.prev.next) que apunte a
  node.next que es null*/
  if(node.prev !== null){
    node.prev.next = node.next;
  }else{
    /*Si no hay nada apuntamos head a
    null que es node.next*/
    this.head = node.next;
  }
  /*Si hay un nodo antes, es decir, no es el
  último, eliminamos la referencia de ese nodo
  y apuntamos el nodo anterior(next)*/
  if(node.next !== null){
    node.next.prev = node.prev;
  }else{
    /*Si el nodo a eliminar es el ultimo, su
    next estará apuntando a null, entonces
    debemos actualizar el end para que sea el prev 
    del nodo a eliminar*/
    this.end = node.prev;
  }
}

LRUCache.prototype.setHead = function(node){
  /*Cada que creamos un nueno nodo, el next debe
  apuntar al head, que es el nodo anterior
  mas "actual"*/
  node.next = this.head;
  /*El prev es null porque no hay nodos mas
  recuentes en ese momento*/
  node.prev = null;
  if(this.head !== null){
    this.head.prev = node;
  }
  /*El nuevo head es nuestro nodo*/
  this.head = node;
  /*Si es el primer nodo, entonces end
  debe tener el head también que es el
  mismo nodo*/
  if(this.end === null){
    this.end = this.head;
  }
}

let cache = new LRUCache(3);
cache.put(1,1);
cache.put(2,2);
cache.put(3,3);
cache.put(4,4);
console.log(cache.get(3));
console.log(cache.get(2));
console.log(cache.get(1));
console.log(cache.get(4));