/*
This problem was asked by Stripe.

Given an array of integers, find the first missing positive integer in linear time and constant space.
In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.

Given an unsorted integer array, find the smallest missing positive integer.

Example 1:

Input: [1,2,0]
Output: 3
Example 2:

Input: [3,4,-1,1]
Output: 2
Example 3:

Input: [7,8,9,11,12]
Output: 1
Note:

Your algorithm should run in O(n) time and uses constant extra space.
https://leetcode.com/problems/first-missing-positive/description/
*/

// Complejidad O(n) en tiempo y espacio O(1)
var firstMissingPositive = function(array) {
  let tam = 0;
  // Non-negative to the left
  for(let i = 0; i < array.length; i++) {
    if(array[i] > 0) {
      let tmp = array[i];
      array[i] = array[tam];
      array[tam++] = tmp;
    }
  }

  /*Marcamos los visitados cambiándole el signo, restamos menos 1 porque el index empieza en 0 y los positivos empiezan en 1*/
  /*Aquí lo importante es marcar el número, no importa el contenido del elemento, eso nos va ayudar a macar los visitados, 
  sí el primer dígito ya está marcado significa que hay un 1 o un número pequeño después, entonces nos basamos en los indexes*/
  let size = array.length;
  for(let i = 0; i < tam; i++) {
    if(Math.abs(array[i]) - 1 < size && array[Math.abs(array[i]) - 1] > 0){
      array[Math.abs(array[i])-1] = - array[Math.abs(array[i])-1];
    }
  }

  // Index es el tamaño de nuestro arreglo positivo
  /*Regresamos el index del primer positivo, eso indica que no fué marcado por lo tanto no hay un número en el arreglo*/
  for(let i = 0; i < tam; i++) {
    if(array[i] > 0) {
      //Se le suma 1 porque es 0-based pero para volver a dejar el resultado normal
      return i+1;
    }
  }
  //Este caso cubre todos los elementos consecutivos, regresaría el siguiente
  return tam+1;
};


//array = [0, 10, 2, -10, -20] //1
//array = [2, 3, 7, 6, 8, -1, -10, 15]; //1
array = [2, 3, -7, 6, 8, 1, -10, 15]; // 4
//array = [1, 1, 0, -1, -2] //2
console.log(firstMissingPositive(array));

//Complejidad O(n) en tiempo y espacion O(n)

var firstMissingPositive = function(nums) {
    let hash = {};
    let number = 0;
    for(let i = 0; i < nums.length; i++) {
        number = nums[i];
        if(number > 0) {
            hash[number] = i;
        }
    }
    
    let count = 1;
    while(true) {
        if(!(count in hash)) {
            return count
        }
        count++;
    }
};

//array = [0, 10, 2, -10, -20] //1
//array = [2, 3, 7, 6, 8, -1, -10, 15]; //1
//array = [2, 3, -7, 6, 8, 1, -10, 15]; // 4
array = [1, 1, 0, -1, -2] //2
console.log(findSmallestPossitive(array));
