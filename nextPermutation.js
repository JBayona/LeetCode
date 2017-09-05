/*
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place, do not allocate extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1

https://leetcode.com/problems/next-permutation/description/
*/

var nextPermutation = function(nums){
  var i = nums.length - 2;
  /*Checamos de atras hacia adelante, cada numero en
  nums[i+1] debe ser menor o igual a i, si esto se
  cumple decrementamos el i*/
  while(i >= 0 && nums[i + 1] <= nums[i]){
    i--;
  }
  if(i >= 0){
    //Empieza a verificar desde atras del arreglo
    var j = nums.length - 1;
    /*Checando desde atras buscamos el primer elemento
    que sea mayor a nuestro elemento que quedamos con el 
    index i, cuando lo encontramos no decrementamos j y
    hacemos swao de nums[i] con nums[j]*/
    while(j >=0 && nums[j] <= nums[i]){
      j--;
    }
    /*Hacemos el swap cuando encontramos el primer numero
    mayor de atras hacia adelante con el num[i]*/
    //Swap
    [nums[i],nums[j]] = [nums[j],nums[i]];
  }

  /*Ya que encontramos el primer elemento mas grande atras para adelante 
  y hacemos swap, hacemos un reverse del array de i + 1 que fue el elemento
  que hicimos swap al final*/
  console.log(reverseArray(nums, i + 1));
}

function reverseArray(arr, start){
  var i = start;
  var j = arr.length - 1;
  while(i < j){
    //Swap
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
  return arr;
}

var array = [1,5,8,4,7,6,5,3,1];
console.log(nextPermutation(array));