/*
"engagement" is a very important metric for Pinterest. Given an array of start times and
end times for pins write an algorithm that returns number of engagements for time intervals.
For example, input: [[0,5],[1,2],[3,7]]
output:
[0,1] -> 1
[1,2] -> 2
[2,3] -> 1
[3,5] -> 2
[5,7] -> 1
*/

function engagement(intervals) {
  let flat = [];
  for (let interval of intervals) {
    // start = +1
    // end = -1
    let [start, end] = interval;
    // flat.push([start, 'start']);
    // flat.push([end, 'end']);
    flat.push([start, 1]);
    flat.push([end, -1]);
  }
  // console.log(flat);
  // Sort the array based on start
  flat.sort((a, b) => a[0] - b[0]);
  let tmpPrefixSum = new Array(flat.length).fill(0);

  // Compute the element
  // for (let i = 0; i < flat.length; i++) {
  //   let [data, action] = flat[i];
  //   if (action === 'start') {
  //     tmpPrefixSum[i]++;
  //   } else {
  //     tmpPrefixSum[i]--;
  //   }
  // }

  // console.log(tmpPrefixSum);

  // Get the range
  let prevTime = null;
  let count = 0;
  let res = [];
  for (let i = 0; i < flat.length; i++) {
    let [time, command] = flat[i];
    if (prevTime !== null && prevTime !== time) {
      res.push({ from: prevTime, to: time, visits: count });
    }
    count += command;
    prevTime = time;
  }

  console.log(res);
}

let input = [
  [0, 5],
  [1, 2],
  [3, 7],
];
console.log(engagement(input));
