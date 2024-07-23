/*
You are asked to design a file system that allows you to create new paths
and associate them with different values.

The format of a path is one or more concatenated strings of the form: / followed by one or
more lowercase English letters. For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string "" and "/" are not.

Implement the FileSystem class:
- bool createPath(string path, int value) Creates a new path and associates a value to
it if possible and returns true. Returns false if the path already exists or its parent path doesn't exist.
- int get(string path) Returns the value associated with path or returns -1 if the path doesn't exist.

https://leetcode.com/problems/design-file-system/description/
*/

var FileSystem = function() {
    this.trie = {children:{}, value: null};
};

/** 
 * @param {string} path 
 * @param {number} value
 * @return {boolean}
 */
FileSystem.prototype.createPath = function(path, value) {
    let node = this.trie;
    let arr = path.split('/');

    // Start from the first one as the "0" would be the
    // first "/"
    for (let i = 1; i < arr.length; i++) {
        let path = arr[i];
        if (!(path in node.children)) {
            // If it´s the last element, add the new level
            if (i === arr.length - 1) {
                node.children[path] = {children:{}, value: null};
            } else {
                return false;
            }
        }
        // Move the node
        node = node.children[path];
    }

    // Overrides not allowed
    if (node.value !== null) {
        return false;
    }

    // Mark as completed
    node.value = value
    return true;
};

/** 
 * @param {string} path
 * @return {number}
 */
FileSystem.prototype.get = function(path) {
    let node = this.trie;
    let arr = path.split('/');
    // Start from the first one as the "0" would be the
    // first "/"
    for (let i = 1; i < arr.length; i++) {
        let word = arr[i];
        if (!(word in node.children)) {
            return -1;
        }
        // If found, traverse the node
        node = node.children[word];
    }
    return node.value;
};