/*
Implement regular expression matching with support for '.' and '*'.

'.' Matches any single character.
'*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

The function prototype should be:
bool isMatch(const char *s, const char *p)

Some examples:
isMatch("aa","a") → false
isMatch("aa","aa") → true
isMatch("aaa","aa") → false
isMatch("aa", "a*") → true
isMatch("aa", ".*") → true
isMatch("ab", ".*") → true
isMatch("aab", "c*a*b") → true

https://leetcode.com/problems/regular-expression-matching/#/description
*/

var isMatch = function(s, p) {
    var lenS = s.length,
        lenP = p.length;
    
    if (p.length === 0) {
        /*Aquí vamos a determinar si ambos son vacios que significa true, de lo contrario si "s" es mayor a cero y "p" que es 
        nuestra regex no, es mayor a cero, significa que no hemos hecho match*/
        return s.length === 0;
    }
    
    //Vamos a verificar si nuestro segundo caracter es "*"
    if (p.charAt(1) === '*') {
        /*Volveremos a llamar la función recursiva quitando el regex por ejemplo c*, si quitando el caracter tiene 
        la misma letra inicial o el punto, podemos recortar ambas cadenas, eso va a pasar en el else de abajo, si no
        tienen las mismas cadenas, vamos a eliminar la primer letra de nuestra "s" que es nuestra cadena original, esto
        es porque podemos tener ninguna o muchas repeticiones y las iremos elimando hasta que podamos verificar si hace
        match o no */
        return isMatch(s, p.substr(2)) || s.length > 0 && (s.charAt(0) === p.charAt(0) || p.charAt(0) === '.') && isMatch(s.substr(1), p);
    } else {
        /*if s.length - falsy (evaluado a false en boolean) regresa false, de lo contrario verifica la cadena 
        (s.charAt(0) === p.charAt(0) || p.charAt(0) === '.') y si es true regresa isMatch(s.substr(1), p.substr(1))
        */
        /*return a && b means
          if (a) return b;
            else return a;
        */
        return s.length > 0 && (s.charAt(0) === p.charAt(0) || p.charAt(0) === '.') && isMatch(s.substr(1), p.substr(1));
    }

};

s = "aab";
p = "c*a*b";
console.log(isMatch(s,p));