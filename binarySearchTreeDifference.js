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
function binarySearchFirstGreaterOrEqual(arr, target) {
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
function binarySearchFirstGreater(arr, target) {
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

// 4) Left First Occurence of Target
// Like standard binary search but continues searching to the left after finding the target.
function binarySearchContinueMatch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = null;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        // mid = left + (right - left) // 2  # avoids overflow
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue to left
        }else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// 5) Last Occurence of Target
// Similar, but go right after a match.
function binarySearchContinueMatch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = null;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        // mid = left + (right - left) // 2  # avoids overflow
        if (arr[mid] === target) {
            result = mid;
            right = mid + 1; // Continue to right
        }else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}
