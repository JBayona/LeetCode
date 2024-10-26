class User {
  constructor() {
    this.data = [];
  }
  // Can we use a Min Heap
  insertData(pin, time, score) {
    // Monotonic stack can be used since once we see a bigger value in the future the old
    // scores won't be used anymore
    while (this.data.length && this.data.at(-1)[2] < score) {
      this.data.pop();
    }
    this.data.push([pin, time, score]);
  }
  getBestPin(currentTime, window) {
    // i) return the pin with maximum score in the window (current_time - window, current_time)
    // ii) you can assume that current_time will always increase in the future calls
    // iii) the window size can increase in the future calls, so you can't throw away old data
    // iv) you don't have to worry about space complexity
    let left = 0;
    let right = this.data.length - 1;
    let target = currentTime - window;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (this.data[mid][1] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // Get the pin
    return this.data[left][0];
  }
}

let user = new User();
let data = [
  ["A", 0, 10],
  ["B", 1, 40],
  ["C", 2, 30],
  ["D", 7, 5],
];
for (let d of data) {
  let [pin, time, score] = d;
  user.insertData(pin, time, score);
}
console.log(user.getBestPin(7, 5)); // C
console.log(user.getBestPin(7, 1)); // D
console.log(user.getBestPin(7, 7)); // B
