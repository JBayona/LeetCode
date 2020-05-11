const sampleInput1 = [
  { from: 5, to: 15 },
  { from: 25, to: 30 },
];

const duration1 = 40;

// Expected Output #1
//  [
//    { from: 0, to: 5 },
//    { from: 15, to: 25 },
//    { from: 30, to: 40 }
//  ];

const sampleInput2 = [
  { from: 0, to: 2 },
  { from: 5, to: 15 },
  { from: 25, to: 30 },
];

const duration2 = 40;

// Expected Output #2
//  [
//    { from: 2, to: 5 },
//    { from: 15, to: 25 },
//    { from: 30, to: 40 }
//  ];

const sampleInput3 = [
  { from: 0, to: 10 },
  { from: 1, to: 6 },
  { from: 4, to: 5 },
  { from: 2, to: 8 },
  { from: 15, to: 20 },
  { from: 25, to: 30 },
];

const duration3 = 40;

// Expected Output #3
//  [
//    { from: 10, to: 15 },
//    { from: 20, to: 25 },
//    { from: 30, to: 40 }
//  ]

const sampleInput4 = [
  { from: 10, to: 20 },
  { from: 5, to: 15 },
  { from: 35, to: 50 },
  { from: 30, to: 40 },
];

const duration4 = 60;


// Expected Output #4
//  [
//    { from: 0, to: 5 },
//    { from: 20, to: 30 },
//    { from: 50, to: 60 }
//  ];

// We want to exclude the time range we have in the intervals
// and just send back the free intervals
const calculateInverseRanges = (trimRanges, duration) => {
  if(!trimRanges.length || !duration) {
    return [];
  }  

  // Sort based on start time
  trimRanges.sort((a, b) => a.from - b.from);

  console.log('SORTED');
  console.log(trimRanges);

  let intervals = [];
  let prev = trimRanges[0];
  for(let i = 0; i < trimRanges.length; i++) {
    let curr = trimRanges[i];
    // No overlap between intervals
    if(curr.from > prev.to) {
      intervals.push(prev);
      prev = curr;
    } else {
      let merged = {from: prev.from, to: Math.max(prev.to, curr.to)};
      prev = merged;
    }
  }
  // Add the last one
  intervals.push(prev);
  //console.log('MERGED');
  //console.log(intervals);

  // Merged intervals
  // console.log('Merged Intervals');
  // console.log(intervals);

  // Format the result
  let lastStart = 0;
  let result = [];
  for(let i = 0; i < intervals.length; i++) {
    let interval = intervals[i];
    if(interval.from > lastStart) {
      result.push({from: lastStart, to: interval.from});
    }
    lastStart = Math.max(lastStart, interval.to);
  }

  if(duration > lastStart) {
    result.push({from: lastStart, to: duration});
  }

  return result;
};

console.log(calculateInverseRanges(sampleInput1, duration1));
console.log(calculateInverseRanges(sampleInput2, duration2));
console.log(calculateInverseRanges(sampleInput3, duration3));
console.log(calculateInverseRanges(sampleInput4, duration4));