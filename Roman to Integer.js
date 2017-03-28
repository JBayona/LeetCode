/*
Given a roman numeral, convert it to an integer.

Input is guaranteed to be within the range from 1 to 3999.
*/
var romanToInt = function(s) {
    var map = {
      'I' : 1,
      'V' : 5,
      'X' : 10,
      'L' : 50,
      'C' : 100,
      'D' : 500,
      'M' : 1000
    };
    result = 0;

    if(s.lenth == 0) return 0;
    /*En los números romanos, todos van de mayor a menor de
    izquierda a derecha, si uno de la izquiera es menor que la derecha
    significa que se va a restar*/
    //DCXXI - Mayor a menor, todos se suman
    //XC - C es mayor que el de la izquierda, por lo tanto se resta
    for(var i = 0; i < s.length; i++){
      //Additive
      result += map[s[i]];
      //Lo suma de todos modos, pero con el resultado - 2 * anterior
      //sale el resultado esperado
      if(i > 0 && map[s[i]] > map[s[i-1]]){
        //Subtractive notation
        result = result - (2 * map[s[i-1]]);
      }
    }
    return result;
};

s = "XC";
console.log(romanToInt(s));