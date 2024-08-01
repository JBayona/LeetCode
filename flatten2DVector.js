/*
Design an iterator to flatten a 2D vector. It should support the next and hasNext operations.

Implement the Vector2D class:

Vector2D(int[][] vec) initializes the object with the 2D vector vec.
next() returns the next element from the 2D vector and moves the pointer one step forward.
You may assume that all the calls to next are valid.
hasNext() returns true if there are still some elements in the vector, and false otherwise.
 
Example 1:
Input
["Vector2D", "next", "next", "next", "hasNext", "hasNext", "next", "hasNext"]
[[[[1, 2], [3], [4]]], [], [], [], [], [], [], []]
Output
[null, 1, 2, 3, true, true, 4, false]

Explanation
Vector2D vector2D = new Vector2D([[1, 2], [3], [4]]);
vector2D.next();    // return 1
vector2D.next();    // return 2
vector2D.next();    // return 3
vector2D.hasNext(); // return True
vector2D.hasNext(); // return True
vector2D.next();    // return 4
vector2D.hasNext(); // return False

https://leetcode.com/problems/flatten-2d-vector
*/

var Vector2D = function(vec) {
    this.v = vec;
    this.row = 0;
    this.col = 0;
};

/**
 * @return {number}
 */
Vector2D.prototype.next = function() {
    if (this.hasNext()) {
        // Increment the column
        return this.v[this.row][this.col++];
    }
};

/**
 * @return {boolean}
 */
Vector2D.prototype.hasNext = function() {
    // reach the limit, move to the next available
    while (this.row < this.v.length && this.col === this.v[this.row].length) {
        this.row++;
        this.col = 0;
    }
    return this.row < this.v.length;
};

/** 
 * Your Vector2D object will be instantiated and called as such:
 * var obj = new Vector2D(vec)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */