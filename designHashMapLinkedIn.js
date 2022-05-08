/*
Design a HashMap without using any built-in hash table libraries.
Implement the MyHashMap class:
MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap.
If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.
 
Example 1:
Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]

https://leetcode.com/problems/design-hashmap/
*/
var MyHashMap = function () {
  // The bigger si bucket size, the less colissions we could have
  this.bucketSize = 1000;
  this.buckets = new Array(this.bucketSize);
  for (let i = 0; i < this.buckets.length; i++) {
    this.buckets[i] = [];
  }
};

MyHashMap.prototype.getBucket = function (key) {
  return this.buckets[key % this.bucketSize];
};

MyHashMap.prototype.findIndexOfKey = function (bucket, key) {
  for (let i = 0; i < bucket.length; i++) {
    let [k, v] = bucket[i];
    if (k === key) {
      return i;
    }
  }
  return -1;
};

MyHashMap.prototype.put = function (key, value) {
  let bucket = this.getBucket(key);
  let index = this.findIndexOfKey(bucket, key);
  if (index !== -1) {
    // Override value, already exist
    bucket[index][1] = value;
  } else {
    bucket.push([key, value]);
  }
};

MyHashMap.prototype.get = function (key) {
  let bucket = this.getBucket(key);
  let index = this.findIndexOfKey(bucket, key);
  if (index === -1) {
    return -1;
  }
  return bucket[index][1];
};

MyHashMap.prototype.remove = function (key) {
  let bucket = this.getBucket(key);
  let index = this.findIndexOfKey(bucket, key);
  if (index === -1) {
    return;
  }
  // Remove
  bucket.splice(index, 1);
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
