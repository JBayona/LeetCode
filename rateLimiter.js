// Design a rate limiter API.
class RateLimiter {
  constructor(limit) {
    this.limit = limit;
    this.counter = 0;
    this.requestTime = new Date().getTime();
  }
  callAPI() {
    let currentTime = new Date().getTime();
    let second = 1000;
    // Reset the timing
    if (currentTime - this.requestTime >= second) {
      this.requestTime = new Date().getTime();
      this.counter = 0;
    }
    if (currentTime - this.requestTime <= second) {
      if (this.counter < this.limit) {
        this.counter++;
        return "PASS";
      } else {
        return "REJECT";
      }
    }
  }
}

// Test.
let api = new RateLimiter(2);
console.log(api.callAPI());
console.log(api.callAPI());
setTimeout(function () {
  console.log(api.callAPI());
  console.log(api.callAPI());
}, 500);
