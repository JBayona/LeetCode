/*
Given an absolute path for a file (Unix-style), simplify it.

For example,
path = "/home/", => "/home"
path = "/a/./b/../../c/", => "/c"

https://leetcode.com/problems/simplify-path/description/
*/

var simplifyPath = function(str) {
    let stack = [];
    let result = '';
    let array = str.split('/');
    let current;
    
    for(let i = 0; i < array.length; i++){
      current = array[i];
      //Si es punto o no tiene nada ignoramos el valor
      if(current === '.' || current.length === 0) continue
      if(current === '..'){
        /*Si tenemos dos puntos y tenemos valores en el stack, sacamos
        el último valor*/
        if(stack.length > 0){
          stack.pop();
        }
      }else{
        /*Si no es nada de lo otro, metemos al stack el directorio*/
        stack.push(current);
      }
    }

    //Format result
    stack.forEach((item) => {
      result += '/' + item;
    });
    if(result === '') result = '/';
    return result;
};

path = "/home/a/./x/../b//c/"
console.log(simplifyPath(path));