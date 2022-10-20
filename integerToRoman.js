/*
Given an integer, convert it to a roman numeral.

Input is guaranteed to be within the range from 1 to 3999.
*/
var intToRoman = function(num) {
    var roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V","IV", "I"];
    var real = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var result = "";
    var count = 0;

    for(var i = 0; i < roman.length; i++){
      if(num >= real[i]){
        /*Número de veces que necesitamos concatenar los números romanos
        El número que tenemos entre el valor real nos dice el valor que
        Debemos poner en nuestro resultado, ejemplo si num = 3; va a ser
        3/1 = 3, lo que necesitamos poner 3 veces el I*/
        count = Math.floor(num/real[i]);
        //Para eso nos sirve el count
        while(count > 0){
          result += roman[i];
          count --;
        }
        //Actualizamos al número que nos queda
        num %= real[i];
      }
    } 
    return result;
};

num = 13;
console.log(intToRoman(num));