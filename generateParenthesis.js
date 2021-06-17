/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]

https://leetcode.com/problems/generate-parentheses/description/
*/

var generateParenthesis = function(n) {
    let result = [];
    helper(n, n, '', result);
    return result;
};

function helper(open, close, str, result) {
    // To be valid, left should always be left than right
    if(open <= close) {
        if(open === 0 && close === 0) {
            result.push(str);
            return;
        }
        // No need to keep recursion if the count is less than zero
        if(open < 0 || close < 0) {
            return;
        }
        helper(open - 1, close, str + '(', result);
        helper(open, close - 1, str + ')', result);
    }
}

//Iterativo
var generateParenthesis = function(n) {
    /*El número de veces que repitiremos el proceso*/
    var i = 1;
    var result = [];
    
    if (n === 0) {
        return result;
    }
    
    result.push('()');
    /*En este while vamos formando las combinaciones de los parentesis hasta
    llegar a la deseada, por ejemplo, si queremos n = 3, obtendremos la de 
    dos y sobre esa sacaremos la de tres con las combinaciones*/
    while (i < n) {
        result = helper(result);
        i++;
    }
    
    return result;
};

function helper(arr) {
    /*Length of the temporary arrays*/
    var len = arr.length;
    var result = [];
    var len1 = null;
    var curStr = null;
    var tmp = null;
    /*Esto es lo mismo, deben de tener
    el mismo número de caracteres*/
    len1 = arr[0].length;
    
    for (var i = 0; i < len; i++) {
        /*curStr tiene nuestros resultados parciales de los anteriores
        generación de n*/
        curStr = arr[i];
        for (var j = 0; j < len1; j++) {
            /*Vamos obteniendo los resultados de las combinaciones por
            cada elemento formado en nuestro arreglo provisioan*/
            tmp = curStr.substring(0, j) + '()' + curStr.substring(j);
            /*Si no tenemos el elemento lo agregamos*/
            if (result.indexOf(tmp) === -1) {
                result.push(tmp);
            }
        }
    }
    
    return result;
}

n = 3;
console.log(generateParenthesis(n));


//Recursivo

var generateParenthesis = function(n) {
    var result = [];
    if(n === 0){
      return result;
    }
    return validParentheses(result,n, n, "");
    //return result;
};

function validParentheses(result, openP, closeP, str) {
    if (openP == 0 && closeP == 0){
      result.push(str);
      return;
    } 
    if (openP > closeP) // means closing parentheses is more than open ones
      return;

    if (openP > 0) validParentheses(result, openP - 1, closeP, str + "("); 
    if (closeP > 0) validParentheses(result, openP, closeP - 1, str + ")"); 
    return result;
}

n = 2;
console.log(generateParenthesis(n));