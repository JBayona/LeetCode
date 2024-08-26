/*
original = [[9:00, 9:45], [9:15, 9:20], [9:16, 9:35], [9:30, 9:40]]

      1           2        1       2       1
|--------|---|--|-----|-----|---|--|--|------|
9:00   9:15  9:16     9:20 9:30  9:40  9:45


           |-----------------| 
          9:16                9:35
      |---------|        |-----------|
     9:15     9:20   9:30        9:40
      
|------------------------------------|
9:00                                         9:45

aux  = [900, 915,916,920,930, 935,940, 945]
temp = [1      2      3     2     3     2     1       0]

[[9:00, 9:45], [9:15, 9:20], [9:16, 9:35], [9:30, 9:40]]
tmp2 = [1     1       1   -1    1       -1    -1      -1]
tmp2 = [1      2      3    2      3      2     1        0]
tmp = [900, 915,916,920,930, 935,940, 945]

9:00 inicio
9:15 inicio
9:16 inicio
9:20 fin
9:30 inicio
9:35 fin
9:40 fin
9:45 fi
*/

function getMaxInterval(times){
  let flat = [];
  for(let time of times) {
    // start = +1
    // end = -1
    let [start, end] = time;
    flat.push([start, 'start']);
    flat.push([end, 'end']);
  }
  // Sort based the array
  flat.sort((a,b) => a[0] - b[0]);
  let tmpPrefixSum = new Array(flat.length).fill(0);
  for(let i = 0; i < flat.length; i++) {
    let [time, action] = flat[i];
    if(action === 'start') {
      tmpPrefixSum[i]++;
    } else {
      tmpPrefixSum[i]--; 
    }
  }
  console.log(tmpPrefixSum);
  let max = Number.MIN_SAFE_INTEGER;
  let index = 0;
  // Prefix sum
  for(let i = 1; i < tmpPrefixSum.length; i++) {
    tmpPrefixSum[i] += tmpPrefixSum[i-1];
    if(tmpPrefixSum[i] > max) {
      max = tmpPrefixSum[i];
      index = i;
    }
  }
  console.log(tmpPrefixSum);
  // Get the range
  for(let i = index; i < flat.length - 1; i++) {
    // Detect when the range is the maximum
    if(tmpPrefixSum[i] >  tmpPrefixSum[i+1]) {
      console.log(`Max range with active call is from range ${flat[i][0]} to ${flat[i+1][0]} with ${max} counts`);
      return;
    }
  }
}

times = [[900, 945], [915, 920], [916, 935], [930, 940]];
console.log(getMaxInterval(times));