function findClosest(arr, num) {
  let diff = Infinity;
  let result = -1;
  for (let n of arr) {
    if (Math.abs(n - num) < diff) {
      diff = Math.abs(n - num);
      result = n;
    }
  }
  return result;
}

array = [1, 4, 7, 10, 11];
n = 6;
console.log(findClosest(array, n));
