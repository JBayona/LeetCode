// Rate Limiter Leaking Bucket
class RateLitimerLeakingBucket {
  // capacity: the maximum number of tokens allowed in the bucket
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = new Array(capacity).fill(true);
    this.requestTime = new Date().getTime();
  }
  getAvailableTokens() {
    return this.queue.length;
  }
  pollRequest() {
    // Try to refill after every second
    if (this.queue.length > 0) {
      this.queue.shift();
      return "PASS";
    }
    return "REJECT";
  }
  // This function should be called 
  request() {
    // Refill only every second
    while (this.queue.length < this.capacity) {
      this.queue.push(true);
    }
  }
}

let rateLimiter = new RateLitimerLeakingBucket(5);
setInterval(function() {
  rateLimiter.consume();
}, 1000);
