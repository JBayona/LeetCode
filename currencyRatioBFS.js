/*
You are given a collection of currency conversation rates where each item
contains a "from" currency code, a "to" currency code and a ratio between the two codes.
Find the conversion rate that maps to the 'to' currency from the 'from' currency.
Your return value should be a number.

Example:
Rates: `['USD', 'JPY', 110], ['USD', 'AUD', 1.45], ['JPY', 'GBP', 0.0070]`
['USD', 'GBP', 0.77] which means 1 USD is equal to 0.77 GBP
From/To currency `['GBP', 'AUD']`
In this case, the correct result is `1.88`.
*/

function getCurrencyRatio(rates, convert) {
  let hash = {};
  for (let conversion of rates) {
    let [start, end, ratio] = conversion;
    if (!(start in hash)) {
      hash[start] = [];
    }
    hash[start].push({ [end]: ratio });
    if (!(end in hash)) {
      hash[end] = [];
    }
    hash[end].push({ [start]: 1.0 / ratio });
  }
  // Queues
  let queue = [];
  let values = [];

  let visited = new Set();
  let [from, to] = convert;

  // console.log(hash);

  queue.push(from);
  values.push(1.0);
  visited.has(from);
  while (queue.length) {
    let currency = queue.shift();
    let val = values.shift();
    let next = hash[currency];
    for (let conversion of next) {
      // Key is the currency
      for (let key in conversion) {
        if (visited.has(key)) {
          continue;
        }
        if (key === to) {
          return val * conversion[key];
        }
        queue.push(key);
        values.push(val * conversion[key]);
      }
    }
  }
  return -1;
}

const rates = [
  ["USD", "JPY", 110],
  ["USD", "AUD", 1.45],
  ["JPY", "GBP", 0.007],
];
// Convert from GBP to AUD
const convert = ["GBP", "AUD"];
console.log(getCurrencyRatio(rates, convert));
