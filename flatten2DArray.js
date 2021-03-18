/*
Implement an iterator to flatten a 2d vector.

For example,
Given 2d vector =
[
  [1,2],
  [3],
  [4,5,6]
]

By calling next repeatedly until hasNext returns false, the order of
elements returned by next should be: [1,2,3,4,5,6].
*/

function Vector2D(matrix) {
    this.matrix = matrix;
    this.row = 0;
    this.col = 0;
}

Vector2D.prototype.next = function() {
    let answer = 0;

    // If we exhaust the matrix
    if(this.row >= this.matrix.length){
        return "No more elements";
    }

    // Check if we have within the limits
    if(this.col < this.matrix[this.row].length) {
        answer = this.matrix[this.row][this.col];
    }
    this.col++;
    // Go to the next row and start from the first column
    if(this.col === this.matrix[this.row].length) {
        this.row++;
        this.col = 0;
    }
    return answer;
}

// If the 2d vec contains empty vec, e.g. [ ], [ ] , [1, 2], [ ], [ ], [3], we need to handle it in method hasNext();
Vector2D.prototype.hasNext = function(){
    while(this.row < this.matrix.length && (!this.matrix[this.row].length || !this.matrix[this.row])) {
        this.row++;
    }

    return (
        // Convert to a boolean a falsy or truly value
        !!this.matrix[this.row] &&
        this.row < this.matrix.length
    );
}i

let vector = [[1,2], [3], [4,5,6]];
let obj = new Vector2D(vector); 
console.log(obj);
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());
console.log(obj.next());
console.log(obj.hasNext());