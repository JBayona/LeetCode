/*
How to get the closest element to zero in an array. If both are the same, return the element
which is possitive
*/

function closestToZero(arr) {
  if (arr.length === 0) return null; // Handle empty array case

  let closest = arr[0]; // Initialize with the first element
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    if (
      Math.abs(current) < Math.abs(closest) ||
      (Math.abs(current) === Math.abs(closest) && current > closest)
    ) {
      closest = current; // Update closest
    }
  }
  return closest;
}

// Example usage
const numbers = [-10, 5, -2, 2, 3];
console.log(closestToZero(numbers)); // Output: 2
