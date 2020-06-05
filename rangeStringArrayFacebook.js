/*
Given a sorted array and k, return a string with the missing numbers, if there are missing
more than two consecutive elements, add a dash, numbers are from 0 to k.
*/

function getRange(array, k) {
  if(k === 0 || array.length === 0) {
    return '';
  }

  let result = [];
  let prev = array[0];
  if(prev > 0 && Math.abs(0-prev) > 2) {
    if(k < prev) {
      return '0 - ' + k;
    } else {
      result.push('0 - ' + (prev - 1));
    }
  }

  for(let i = 0; i < array.length - 1; i++) {
    let current = array[i];
    let next = array[i+1];
    // Missing one element
    if(Math.abs(current - next) == 2) {
      result.push(current + 1);
      if(current + 1 == k) {
        break;
      }
      prev = next; 
    } else if(Math.abs(current - next) === 3) { // Missing two elements
      if(next >= k) {
        result = result.concat([current + 1, k]);
        break;
      } else {
        result = result.concat([current + 1, current + 2]);
      }
      prev = next;
    }else if(Math.abs(current - next) > 3) { // Missing more than two elements
      // If we exceed k
      if(next >= k) {
        result.push((prev + 1) + ' - ' + k);
        break;
      } else {
        result.push((prev + 1) + ' - ' + (next - 1));
      }
      prev = next;
    }
  }
  return result.join(', ');
}

array = [3, 5, 8, 56, 87, 239];
k = 85; // 0 - 2, 4, 6, 7, 9 - 55, 57 - 85
// k = 87; // 0 - 2, 4, 6, 7, 9 - 55, 57 - 87
// k = 239; // 0 - 2, 4, 6, 7, 9 - 55, 57 - 86, 88 - 239
// k = 4; // 0 - 2, 4
// k = 2; // 0 - 2
console.log(getRange(array, k));