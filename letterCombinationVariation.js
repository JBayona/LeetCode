/*
Given an array of one or more vanity codes and an array of phone numbers, write a function to find all
phone numbers that match one or more vanity codes. The output must be a sorted array of unique phone
numbers from the input array of numbers

2 = abc, 3 = def, 4 = ghi, 5 = jkl, 6 = mno, 7 = pqrs, 8 = tuv, 9 = xxyz

Imput:
codes = ['TWLO', 'CODE', 'HTCH', 'S'];
numbers = ['+17474824380', '+14157088956', '+919810155555', '+15109926333', '+1415123456']
Output: [ '+14157088956', '+15109926333', '+17474824380' ]

Explanation:
TWLO matches +14157088956 (+1415708 - TWLO)
CODE matches +15109926333 (+151099 - CODE - 3)
HTCH matches +17474824380 (+1747 - HTCH - 380)
*/

function vanity(codes, vanity) {
  let res = new Set();
  let numberSequences = new Set();
  let map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  for (let i = 0; i < codes.length; i++) {
    let numberSequence = "";
    let code = codes[i];
    for (let j = 0; j < code.length; j++) {
      let c = code[j].toLowerCase();
      for (let prop in map) {
        if (map[prop].indexOf(c) >= 0) {
          // Append number
          numberSequence += prop;
          break;
        }
      }
    }
    numberSequences.add(numberSequence.toString());
  }

  let opt = new Set();
  for (let number of numbers) {
    for (let sequence of numberSequences) {
      if (number.includes(sequence)) {
        opt.add(number);
      }
    }
  }
  return Array.from(opt).sort();
}

codes = ["TWLO", "CODE", "HTCH", "S"];
numbers = [
  "+17474824380",
  "+14157088956",
  "+919810155555",
  "+15109926333",
  "+1415123456",
];
console.log(vanity(codes, numbers));
