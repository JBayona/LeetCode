// Rate Limiter Token Bucket
class RateLitimerTokenBucket {
  // capacity: the maximum number of tokens allowed in the bucket
  // refillRate: number of tokens put into the bucket every second or other specified time period.
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.availableTokens = capacity;
    this.requestTime = new Date().getTime();
  }
  getAvailableTokens() {
    return this.availableTokens;
  }
  consume() {
    // Try to refill after every second
    this.refill();
    if (this.availableTokens > 0) {
      this.availableTokens--;
      return "PASS";
    }
    return "REJECT";
  }
  refill() {
    let now = new Date().getTime();
    // Refill only every second
    let second = 1000;
    if (now - this.requestTime >= second) {
      if (this.availableTokens < this.capacity) {
        let elapsedTime = now - this.requestTime;
        let delta = this.refillRate * elapsedTime;
        this.availableTokens = Math.min(
          this.capacity,
          this.availableTokens + delta
        );
      }
      this.requestTime = now;
    }
  }
}

