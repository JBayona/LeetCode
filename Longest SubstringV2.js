/*
Given a string, find the length of the longest substring without repeating characters.

Examples:

Given "abcabcbb", the answer is "abc", which the length is 3.

Given "bbbbb", the answer is "b", with the length of 1.

Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

Complex O(n)
*/

//Complejidad de O(N), i iterará n veces
/*
Usamos sliding window, es un método para arrays y cadenas definidos por un
indice [i,j) (left-closed, right-open), si encontramos que s[j] tiene un
rango repetido entre [i,j) con index j', no necesitamos incrementar i poco
a poco, podemos brincarnos el rango [i,j'] y poner i como j' + 1
i- recorre inicio, j recorre final
*/
/*
Debemos empezar con j+1 porque si tenemos una cadena de sólo una letra,
nos va a arrojar 0, i representa la cadena en donde empieza y j en donde
termina

Los elementos en el map tienen indices que representan en donde se vió 
la última vez la letra

Para sacar el max length, i y j se suma y restan como números enteros.
Para determinar el str, se usa 0-based, el str es s[i]-s[j]

Los números que se almacenan desde el map empezando con 1 es sólo para
contar el tamaño máximo que llevamos en el substr, por el caso de que sea
sólo una letra
*/
var lengthOfLongestSubstring = function(s) {
    var max = 0;
    var map = {};
    var letter = '';
    var start = 0;
    for(var i = 0; i < s.length; i++){
      letter = s.charAt(i);
      if(letter in map &&  map[letter] >= start){
        /*Cuando ya encontramos una letra repetida, antes de 
        ponerla en el hash, podemos i en la posición de donde
        comienza la nueva cadena, en la primera ocurrencia es w y i = 2*/
        start = map[letter] + 1;
      }
      /*Para sacar el número de letras del rango, es la posición
      final que es j, menos la inicial que es i + 1 por ser 0-based*/
      max = Math.max(max, i - start + 1);
      map[letter] = i; //Como no hemos encontrado repetido, incrementamos j
    }
    return max;
};

word = "abba";
console.log(lengthOfLongestSubstring(word)); 