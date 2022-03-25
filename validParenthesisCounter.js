// /**
//  * This function determines if the braces ('(' and ')') in a string are properly matched.
//  * it ignores non-brace characters.
//  * Some examples:
//  * "()()()()"   -> true
//  * "((45+)*a3)" -> true
//  * "(((())())"  -> false
//  * "))((" -> false  
//  */
//  public boolean matched(String s) {
//     // Implementation here
//  }

const matched = str => {
  let count = 0;
  for(let i = 0; i < str.length; i++) {
    let c = str[i];
    if(c === "(") {
      count++;
    } else if(c === ')') {
      count--;
    }
    if(count < 0) return false;
  }
  return count === 0;
}


"(((())())"
c = )
count = 0