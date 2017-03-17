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
*/
var lengthOfLongestSubstring = function(s) {
    var max = 0;
    var map = {};
    var letter = '';
    var i = 0;
    for(var j = 0; j < s.length; j++){
      letter = s.charAt(j);
      if(letter in map){
        /*Cuando ya encontramos una letra repetida, antes de 
        ponerla en el hash, podemos i en la posición de donde
        comienza la nueva cadena, en la primera ocurrencia es w y i = 2*/
        i = Math.max(map[letter], i);
      }
      /*Para sacar el número de letras del rango, es la posición
      final que es j, menos la inicial que es i + 1 por ser 0-based*/
      max = Math.max(max, j - i + 1);
      map[letter] = j+1; //Como no hemos encontrado repetido, incrementamos j
    }
    return max;
};

word = "pwwkew";
console.log(lengthOfLongestSubstring(word)); 