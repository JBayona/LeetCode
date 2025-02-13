// Global  minimum value
// Stream/chunkks of data, result computing
// Overall result
class Process {
    constructor() {
      this.list = new Set();
      this.min = Infinity;
      this.job1 = new Job();
      this.job2 = new Job();
    }
    run() {
      this.min = Math.min(this.job1.run([2, 9, 10]),  this.job2.run([3, 1, 12]));
      return this.min;
    }
}

class Job {
    constructor() {
      this.list = new Set();
      this.min = Infinity;
    }
    run(set) {
      set.forEach(elem => this.list.add(elem));
      this.min = Math.min(...Array.from(this.list));
      return this.min;
    }
}

let process = new Process();
console.log(process.run()); // 1