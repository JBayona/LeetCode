// Example of sliding window average algorithm, with window size of 2
// Given data array of [1.0, 3.0, 5.0]:
// Read in 1.0, window is looking at (1.0), average 1.0
// Read in 3.0, window is looking at (1.0,3.0), average 2.0
// Read in 5.0, window is looking at (3.0,5.0), average 4.0

// Sliding window size: 2
// Data array: [210.0, 185.0, 200.0]
// Read in 210.0, average is 210.0
// Read in 185.0, average is 197.5
// Read in 200.0, average is 192.5

// Sliding window size: 2
// Data array: [505.2, 454.68, 553.32, 892.7, 499.76, 88.23, 477.1]
// Read in 505.2, average is 505.2
// Read in 454.68, average is 479.94
// Read in 553.32, average is 504.0
// Read in 892.7, average is 723.01
// Read in 499.76, average is 696.23
// Read in 88.23, average is 294.0
// Read in 477.1, average is 282.67

// Sliding window size: 5
// Data array: [780.0, 331.0, 412.0, 403.0, 978.0, 372.0, 306.0, 355.0, 698.0, 487.0]
// Read in 780.0, average is 780.0
// Read in 331.0, average is 555.5
// Read in 412.0, average is 507.67
// Read in 403.0, average is 481.5
// Read in 978.0, average is 580.8
// Read in 372.0, average is 499.2
// Read in 306.0, average is 494.2
// Read in 355.0, average is 482.8
// Read in 698.0, average is 541.8
// Read in 487.0, average is 443.6

function slidingWindow(arr, size) {
  let left = 0;
  let right = 0;
  let current = 0;
  while (right < arr.length) {
    let num = arr[right];
    current += num;
    while (right - left + 1 > size) {
      current -= arr[left];
      left++;
    }
    let result = current / (right - left + 1);
    console.log(toFormat(result));
    right++;
  }
}

function toFormat(num) {
  return parseFloat(num.toFixed(2));
}

// let size = 5;
// let array = [210.0, 185.0, 200.0];
// let array = [505.2, 454.68, 553.32, 892.7, 499.76, 88.23, 477.1];
// let array = [780.0, 331.0, 412.0, 403.0, 978.0, 372.0, 306.0, 355.0, 698.0, 487.0];
// console.log(slidingWindow(array, size));

// Part 2
// We’ve added a percent threshold parameter. All other inputs remain the same.
// Percent threshold is a floating point value representing a percentage (e.g. 0.05 is 5%), and it defines a range of +/- that percentage from 100. So a 5% threshold defines a range from 95-105%.

// Spike: potential new average is above the threshold
// Dip: potential new average is below the threshold

// Note 1: First data point will always be accepted, since there is no current average to compare it with.
// Note 2: Validity is inclusive of the threshold, so potential new averages on the borderline are valid.

// Test case 1 below provides additional comments to explain how it works.

// Sliding window size: 2, Pct Threshold: 0.05
// Data array: [210.0, 185.0, 200.0]

// # No current average, no thresholds. After reading in 210.0, the potential new average is 210.0. First data point is always accepted, so the current average is now 210.0
// Read in 210.0, average is 210.0

// # Current average is 210.0, threshold is [199.5, 220.5]. After reading in 185.0, the potential new average is 197.5. Potential new average is below the threshold (dip), so 185.0 is an outlier and rejected (like it never existed). Current average remains 210.0
// Read in 185.0, average is 210.0 - dip found

// # Current average is 210.0, threshold is [199.5, 220.5]. After reading in 200.0, the potential new average is 205.0. This is within the threshold, so 200.0 is accepted and our current average is now 205.0
// Read in 200.0, average is 205.0

function slidingWindow2(arr, size, pct) {
  let left = 0;
  let right = 0;
  let current = 0;
  let eligibleElements = [];
  let signal = "";
  while (right < arr.length) {
    let num = arr[right];
    if (right === 0) {
      current += num;
      eligibleElements.push(num);
    } else {
      let [low, upper] = defineBoundaries(pct, current);
      if (num >= low && low <= upper) {
        current += num;
        eligibleElements.push(num);
      } else {
        signal = num >= low ? "spike found" : "dip found";
      }
    }
    while (eligibleElements.length > size) {
      let toRemove = eligibleElements.shift();
      current -= arr[toRemove];
    }
    let avg = toFormat(current / eligibleElements.length);
    let result = signal === "" ? avg : avg + " - " + signal;
    console.log(result);
    // Clean signal
    signal = "";
    right++;
  }
}

function defineBoundaries(pct, current) {
  return [current * (1 - pct), current * (1 + pct)];
}

function toFormat(num) {
  return parseFloat(num.toFixed(2));
}

let size = 2;
let array = [210.0, 185.0, 200.0];
let pct = 0.05;
// // let array = [505.2, 454.68, 553.32, 892.7, 499.76, 88.23, 477.1];
// // let array = [780.0, 331.0, 412.0, 403.0, 978.0, 372.0, 306.0, 355.0, 698.0, 487.0];
console.log(slidingWindow2(array, size, pct));
