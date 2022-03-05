/*
Process a log file to compute average session time spent per user on an app.

You are given a large log file which stores user interactions with an application.

The entries in the log file follow the following schema:
{userId, timestamp, actionType}
where actionType is one of two possible values: [open, close]
Example:

log = [
[1,1,'open'],   user 1, timestamp 1, open the app
[2,2,'open'],
[1,6,'close'],   user 1, ts 6, close the app,  the session time is 6-1=5
[2,7,'close'],
[1,9,'open'],    user 1, ts 9, open
[1,10,'close']        1.    10.                   session time 10-9=1 
]

[1,1,'open'],   user 1, timestamp 1, open the app
[1,6,'close'],   user 1, ts 6, close the app,  the session time is 6-1=5
[1,9,'open'],    user 1, ts 9, open
[1,10,'close'] 
[2,2,'open'],
[2,7,'close'],


{
    1: [1,3,4,5,6,7]
    2: [{2}]
}

{
    1: {
        avg: sum/sessions
        sum: (2-1) + (10 - 9)
        open: 9,
        close: 10,
        sessions: 2
    }
    1: {
        open: [x, y, z]
        close: [x, t, c]
    }
    
}

Returns
{1: 3,   avg session time for user 1, (5+1)/2=3
2: 5}
*/
/*
{
    1: [{open, close}, {open, close}]
    2: [{open, close}, {open, close}]
}

follow up:
1) read the file line by line as opposed to loading the whole file in memory, and 
2) compute the average iteratively instead of keeping a vector of session lengths. 

follow up 2:
Now assume that open events and close events do not match; there may be a close event before an open event for a user, several open events before a close event for a user, and so on. What policy would you apply to determine session length?
*/

const processSessionAvgTime = (logs) => {
  let hash = {};
  for (let log of logs) {
    const [userID, time, action] = log;
    if (!(userID in hash)) {
      hash[userID] = { open: [], close: [] };
    }
    if (action === "open") {
      hash[userID].open.push(time);
    } else {
      hash[userID].close.push(time);
    }
  }
  let result = {};
  for (let user in hash) {
    let open = hash[user].open;
    let close = hash[user].close; // Compute avg session time
    let sum = 0;
    let len = hash[user].open.length;
    for (let i = 0; i < len; i++) {
      sum += close[i] - open[i];
    }
    result[user] = sum / len;
  }
  return result;
};

let hash2 = {};
const processSessionAvgTime2 = (log) => {
  const [userID, time, action] = log; // 1. 1 open
  if (!(userID in hash2)) {
    hash2[userID] = {
      sum: 0,
      avg: 0,
      open: null,
      close: null,
      numberSessions: 0,
    };
  }
  if (action === "open") {
    hash2[userID].open = time;
  } else {
    if (!hash2[userID].open) {
      return "Error";
    }
    hash2[userID].close = time;
    hash2[userID].sum += time - hash2[userID].open;
    hash2[userID].numberSessions++;
    hash2[userID].avg = hash2[userID].sum / hash2[userID].numberSessions; // Clean connections
    hash2[userID].open = null;
    hash2[userID].close = null;
    console.log(hash2[userID].avg);
  }
};

/*{
    1: {sum: 6, avg: 3, open: 9, close: 10, numberSessions: 2}
    2: {sum: 5, avg: 5, open: 2, close: 7, numberSessions: 1}
}*/

/*
 [1,1,'open'],   //user 1, timestamp 1, open the app
        [2,2,'open'],
        [1,6,'close'],   // user 1, ts 6, close the app,  the session time is 6-1=5
        [2,7,'close'],
        
        [1,9,'open'],    //user 1, ts 9, open
        [1,10,'close']    
*/

function main() {
  // var res = addNumbers(a, b);
  // console.log("The sum is " + res);
  const logs = [
    [1, 1, "open"], //user 1, timestamp 1, open the app
    [2, 2, "open"],
    [1, 6, "close"], // user 1, ts 6, close the app,  the session time is 6-1=5
    [2, 7, "close"],
    [1, 9, "open"], //user 1, ts 9, open
    [1, 10, "close"], // 1.    10.                   session time 10-9=1
  ]; // console.log(processSessionAvgTime(log));
  for (let log of logs) {
    processSessionAvgTime2(log);
  }
}
