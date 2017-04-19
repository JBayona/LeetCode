/*
Write a function to find the longest common prefix string amongst an array of strings.

Example:
Input  : {“geeksforgeeks”, “geeks”, “geek”, “geezer”}
Output : "gee"

Input  : {"apple", "ape", "april"}
Output : "ap"

https://leetcode.com/problems/longest-common-prefix/#/description
*/
var longestCommonPrefix = function(strs) {
    if(strs.length == 0 || strs == "") return "";
    var currentChar = '';
    var len1 = strs[0].length;
	//Iteramos sobre la primer cadena
    for(var i = 0; i < len1; i++){
	  //Vamos sacando caracter por caracter de la primer cadena
      currentChar = strs[0].charAt(i);
      //Empezamos a analizar de la segunda cadena en adelante
      for(var j = 1; j < strs.length; j++){
		/*Vamos a analizar los caracteres que vayamos sacando
		de la primera cadena en las restantes*/
        if(strs[j].charAt(i) !== currentChar){
          return i == 0 ? '' : strs[0].substring(0,i);
        }
        /*Es una cadena completa, no necesitamos
        analizar toda la cadena*/
        if(strs[j].length == i){
          return strs[j];
        }
      }
    }
    //Fué toda la cadena el prefix
    return strs[0];
};

array = ['geeksforgeeks', 'geeks', 'geek', 'geezer'];
console.log(longestCommonPrefix(array));