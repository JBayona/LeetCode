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


// Time O(n)
/*
the key to this problem is to realize that the next permutation is to
find the first decreasing pattern backwards (because the next permutation
needs to be the smallest number that's larger than the current number).
i.e. 154231 -> 154312 the first decreasing pattern is from 3 to 2

so the next question is which one we should pick to promote to the more
significant digit. to satify the definition of the next permutation, we need
to pick the smallest number that is larger than the one on the digit we are
trying to promote a new number to. so in the above example, the digit we are
trying to promote to is index 3(0 from left). so we need to find the smallest
number on the right side of this digit that is larger than it (we can use the
binary search here as we know the right side is in ascending order, this is
because we stop at the first decreasing pattern. but this will not change the
overall time complexity). so in my solution, i just loop through from the back
and take the first one that's larger.

once we swap the two, just reverse the array from promotion digit + 1 to the end
in this case, from 4 to 5

the corner case where is the last permutation, we will know that by realizing
that the number is perfectly ordered ascending from back to front, so
we can just reverse.
*/
// Time O(N)
var nextPermutation = function(nums) {
  if(!nums) {
      return null;
  }
  
  let left = null;
  let right = null;
  // Find left index (first decrease element backwards)
  for(let i = nums.length - 2; i >= 0; i--) {
      if(left === null && nums[i] < nums[i + 1]) {
          left = i;
          break;
      }
  }
  
  // Find right index, first greater after the decrease pattern
  for(let i = nums.length - 1; i >= left; i--) {
      if(right === null && nums[i] > nums[left]) {
          right = i;
          break;
      }
  }
  
  // If the array is already in decreasing sequence
  if(right === null) {
      nums.reverse();
      return;
  }
  // Swap left and right index
  swap(left, right, nums);
  // Reverse after left
  reverse(left + 1, nums);
}

function swap(start, end, nums) {
  let tmp = nums[start];
  nums[start] = nums[end];
  nums[end] = tmp;
}

function reverse(start, nums) {
  let end = nums.length - 1;
  while(start < end) {
      swap(start, end, nums);
      start++;
      end--;
  }
}

// Another option
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