function getLargestPiece(dimension, xCuts, yCuts) {
  // We need to sort them to get the different dimensions
  xCuts.sort((a, b) => a - b);
  yCuts.sort((a, b) => a - b);

  let parsed = dimension.split(',');
  let x = Number(parsed[0]);
  let y = Number(parsed[1]);

  let xMax = 0;
  switch (xCuts.length) {
      case 0: xMax = x; break;
      case 1: xMax = Math.max(Math.abs(xCuts[0] - 0), Math.abs(x - xCuts[0])); break;
      case 2: xMax = Math.max(Math.abs(xCuts[0] - 0), Math.abs(xCuts[0] - xCuts[1]), Math.abs(x - xCuts[1])); break;
  }

  let yMax = 0;
  switch (yCuts.length) {
      case 0: yMax = y; break;
      case 1: yMax = Math.max(Math.abs(yCuts[0] - 0), Math.abs(y - yCuts[0])); break;
      case 2: yMax = Math.max(Math.abs(yCuts[0] - 0), Math.abs(yCuts[0] - yCuts[1]), Math.abs(y - yCuts[1])); break;
  }

  return xMax * yMax;
}

console.log(getLargestPiece("9,9", [3,6], [3,6])); // 9
// x = 9 -> 3, 6 -> 0 - 3 = 3, 3-6 = 3, 6-9 = 3
// y = 9 -> 3, 6 -> 0 - 3 = 3, 3-6 = 3, 6-9 = 3

console.log(getLargestPiece("10,10", [8,2], [2,8])); // 36
console.log(getLargestPiece("10,10", [3], [])); // 70
console.log(getLargestPiece("10,10", [], [])); // 100
console.log(getLargestPiece("100,70", [25], [])); // 5250
console.log(getLargestPiece("100,70", [], [35])); // 3500
console.log(getLargestPiece("100,70", [50], [])) // 3500
console.log(getLargestPiece("100,70", [80,20], [35])); // 2100