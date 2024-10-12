// -----   5/1     5/5     5/8   5/22
// PLTR    100     200
// MSFT             50     100
// AMZN    200             100
// PINT                          500
// -----   -----  ------  ----- -----
// Total   300     450     400   900

// Input Data:
//     [[(5/1, 100), (5/5, 200)], # PLTR
//      [(5/5,  50), (5/8, 100)], # MSFT
//      [(5/1, 200), (5/8, 100)]] # AMZN

// Output:
//     [(5/1, 300), (5/5, 450), (5/8, 400)]
// Option 1
const getPortafolio = (port) => {
  let hash = {};
  let dates = new Set();
  for (let i = 0; i < port.length; i++) {
    hash[i] = {};
    let stockHistory = port[i];
    // For each stock, create a data structure to keep track of the index
    // month and the price of each days
    for (let data of stockHistory) {
      let [date, price] = data;
      let arr = date.split("/");
      let month = Number(arr[0]);
      let day = Number(arr[1]);
      // Track the dates we want to get the result
      dates.add(date);
      // Javascript dates are 0-index based
      let numDaysOfMonth = getDaysInMonth(2024, month - 1);
      if (!(month in hash[i])) {
        // Create the template for all months and days
        hash[i][month] = new Array(numDaysOfMonth).fill(0);
      }
      // As the dates are sorted, all the elements from now to the end
      // should have  the same results
      let m = hash[i][month];
      // Plus 1 as we need to consider
      let total = m.length - day + 1;
      // Add from all the days of the month
      hash[i][month] = [
        ...m.slice(0, day - 1),
        ...new Array(total).fill(price),
      ];
    }
  }

  // Get the total value portafolio across all days for
  // all stocks
  let map = {};
  for (let date of dates) {
    let arr = date.split("/");
    let month = Number(arr[0]);
    let day = Number(arr[1]);
    if (!(date in map)) {
      map[date] = 0;
    }
    for (let prop in hash) {
      if (month in hash[prop]) {
        // hash is
        /*
          0: {
             1: new Array(daysOfMonthJan)
             2: new Array(daysOfMonthFeb)
             3: new Array(daysOfMonthMarch)
          }
        */
        map[date] += hash[prop][month][day];
      }
    }
  }

  // Desired format
  let result = [];
  for (let prop in map) {
    result.push([prop, map[prop]]);
  }
  return result;
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const input = [
  [
    ["5/1", 100],
    ["5/5", 200],
  ],
  [
    ["5/5", 50],
    ["5/8", 100],
  ],
  [
    ["5/1", 200],
    ["5/8", 100],
  ],
  [
    ["5/22", 500],
  ],
];
console.log(getPortafolio(input));
