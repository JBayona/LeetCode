/*
Design and implement a data structure for a compressed string iterator. It should support the following operations: next and hasNext.
The given compressed string will be in the form of each letter followed by a positive integer representing the number of this letter existing in the original uncompressed string.
next() - if the original string still has uncompressed characters, return the next letter; Otherwise return a white space.
hasNext() - Judge whether there is any letter needs to be uncompressed.
Note:
Please remember to RESET your class variables declared in StringIterator, as static/class variables are persisted across multiple test cases. Please see here for more details.
Example:
StringIterator iterator = new StringIterator("L1e2t1C1o1d1e1");

iterator.next(); // return 'L'
iterator.next(); // return 'e'
iterator.next(); // return 'e'
iterator.next(); // return 't'
iterator.next(); // return 'C'
iterator.next(); // return 'o'
iterator.next(); // return 'd'
iterator.hasNext(); // return true
iterator.next(); // return 'e'
iterator.hasNext(); // return false
iterator.next(); // return ' '

https://leetcode.com/problems/design-compressed-string-iterator/
*/

// Option 1
// Queue
class StringIterator {
    constructor(str) {
      this.str = str;
      this.queue = [];
  
      let n = str.length;
      let i = 0;
      while (i < n) {
        // Number should be right after the letter
        let j = i + 1;
        // Keep moving j until we find there's no numbers as we can have a very big number
        while (j < n && !isNaN(this.str[j]) && this.str[j] >= 0) {
          j++;
        }
        // Push in our queue the letter and the number of times it was found
        this.queue.push({
          letter: this.str[i],
          count: Number(this.str.substring(i + 1, j)),
        });
        i = j;
      }
    }
    next() {
      if (!this.queue.length) {
        return "";
      }
      // It will update as well the values as it´s for reference
      let top = this.queue[0];
      // Si ya no hay elementos lo sacamos del heap
      if (--top.count === 0) {
        this.queue.shift();
      }
      return top.letter;
    }
    hasNext() {
      return this.queue.length !== 0 ? true : false;
    }
  }
  
  let iterator = new StringIterator("L10e2t1C1o1d1e1");
  console.log(iterator.next());
  console.log(iterator.hasNext());
  console.log(iterator.next());
  console.log(iterator.hasNext());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.hasNext());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  