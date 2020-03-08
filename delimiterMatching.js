/*

Write an algorithm to determine if all of the delimiters in an expression are matched and closed.
For example, “{ac[bb]}”, “[dklf(df(kl))d]{}” and “{[[[]]]}” are matched. But “{3234[fd” and {df][d} are not.

http://blog.gainlo.co/index.php/2016/09/30/uber-interview-question-delimiter-matching/

*/

function delimiterMatching(str){
  let map = {'(': ')', '{' : '}', '[' : ']'};
  let stack = [];
  let element;
  let current;
  for(let i = 0; i < str.length; i++){
    element = str[i];
    if(element in map){
      stack.push(element);
    }else{
      if(stack.length === 0){
        return false;
      }else if(Object.values(map).indexOf(element) >= 0){
        current = stack.pop();
        if(map[current] !== element){
          return false;
        }
      }
    }
  }
  return stack.length > 0 ? false: true;
}

str = "{df][d}";
console.log(delimiterMatching(str));
