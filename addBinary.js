/*

Given two binary strings, return their sum (also a binary string).

For example,
a = "11"
b = "1"
Return "100".

https://leetcode.com/problems/add-binary/description/
*/

var addBinary = function(str, str2){
  let result = [];
  let i = str.length-1;
  let j = str2.length-1;
  let carry = false;
  let n1,n2;
  while(i >= 0 || j >= 0 || carry){ 
    n1 = str[i] ? str[i] : '0';
    n2 = str2[j] ? str2[j] : '0';
    if(n1 === '1' && n2 === '0' || n1 === '0' && n2 === '1'){
      /*Si tenemos carry entonces sería el caso de (1+0) + 1 = 0 con carry 1
      o si no tenemos carry unicamente es 0 sin carry*/
      result.unshift(carry ? '0' : '1');
    }else if(n1 === '0' && n2 === '0'){
      /*En este caso no tenemos carry de ninguna forma, sólo podemos
      obtener un uno o cero dependiendo si tenemos carry*/
      result.unshift(carry ? '1' : '0');
      carry = false;
    }else{ 
      /*Al entrar a esta condicion es porque los dos números son 1 y 1
      en este caso siemre existirá un flag y sólo debemos verificar si
      ponemos 1 y 0 dependiendo de si tenemos un anterior carry*/
      result.unshift(carry ? '1' : '0'); 
      carry = true;
    }
    i--;
    j--;
  }
  return result.join('');
}

a = "11";
b = "1";
console.log(addBinary(a,b));
