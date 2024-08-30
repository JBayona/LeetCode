/*
Build an expression parser.
The format of an individual statement will be:
“( CMD VAL VAL )”

VAL can be an integer or another statement.

You can assume valid inputs for this entire exercise.
If you need to, clarify what you assume are valid inputs.

The first two commands to implement are ADD and MULT,
which add and multiply the values, respectively.

Example:
parse("( ADD 3 4 )") == 7
parse("( ADD ( MULT ( ADD 3 4 ) 5 ) 1 )") ==
 */

const parse = str => {
  let arr = str.split(' ');
  let index = 0;
  let stackNumber = [];
  let stackOperator = [];
  let result = 0;
  while (index < arr.length) {
      let c = arr[index];
      if (c === 'ADD' || c === 'MULT') {
          stackOperator.push(c);
      } else if (!isNaN(c)) {
          stackNumber.push(Number(c));
      } else if (c === ')') {
          let a = stackNumber.pop();
          let b = stackNumber.pop();
          let operator = stackOperator.pop();
          switch(operator) {
              case 'ADD': stackNumber.push(a + b); break;
              case 'MULT': stackNumber.push(a * b); break;
          }
      }
      index++;
  }
  return stackNumber.pop();
}

// console.log(parse("( ADD 3 4 )")); // => 7
// console.log(parse("( ADD ( MULT ( ADD 3 4 ) 5 ) 1 )")); // => 36
console.log(parse("( ADD ( MULT ( ADD 3 4 ) 5 ) 1 )"));
// console.log(parse("( ADD ( MULT ( ADD 3 4 ) ( ADD 2 3 ) ) 1 )")); // => 36
// console.log(parse("( ADD ( MULT ( ADD 3 4 ) ( ADD 2 5 ) ) 1 )")); // => 50