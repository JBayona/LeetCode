class ResumableIterator {
  constructor(data) {
    this.index = 0;
    this.data = data;
  }
  next() {
    if (this.index < this.data.length) {
      return {value: this.data[this.index++], done: false};
    }
    return {done: true};
  }
  reset() {
    this.index = 0;
  }
  getIndex() {
    return this.index;
  }
  hasNext() {
    return this.index < this.data.length;
  }
  setIndex(index) {
    if (this.index >= 0 && index <= this.data.length) {
      this.index = index;
    }
  }
}


const iterator = new ResumableIterator([10, 20, 30, 40]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.hasNext());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.hasNext());
console.log(iterator.reset());
console.log(iterator.next());
console.log(iterator.next());