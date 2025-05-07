// 1) Standar and Exact Match

function binarySearchMatch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        // mid = left + (right - left) // 2  # avoids overflow
        if (arr[mid] === target) {
            return mid;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// 2) First Occurence >= target
// Finds the first index where the element is greater than or equal to the target.
function binarySearchMatch(arr, target) {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        // mid = left + (right - left) // 2  # avoids overflow
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left; // May return len(arr) if target > all numbers
}
// Used when array has duplicates.
// Returns insertion position.

// 3) First Occurence > target
// Finds the first index where the element is strictly greater than the target.
function binarySearchMatch(arr, target) {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        // mid = left + (right - left) // 2  # avoids overflow
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left; // May return len(arr) if target > all numbers
}
// Used when array has duplicates.
// Returns insertion position.