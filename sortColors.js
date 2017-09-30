/*
Given an array with n objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note:
You are not suppose to use the library's sort function for this problem.

click to show follow up.

Follow up:
A rather straight forward solution is a two-pass algorithm using counting sort.
First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.

Could you come up with an one-pass algorithm using only constant space?


https://leetcode.com/problems/sort-colors/description/
*/
ç//O(N)
var sortColors = function(nums) {
    //Posicion en donde termian las bolas rojas
    var redEnds = 0;
    //Las ultimas posiciones son para las bolas azules
    var blueStars = nums.length -1

    //Empieza el loop para ordenar las bolas
    for(var i = 0; i <= blueStars; ){
      if(nums[i] === 0){
        //Hacemos swao
        swap(redEnds, i, nums);
        //Incrementamos en donde terminan las bolas rojas
        redEnds++;
        //Incrementamos i
        i++;
      }else if(nums[i] === 2){
        //Hacemos swap
        swap(blueStars, i, nums);
        //Decrementamos la posicion en donde empiezan las bolas azules
        blueStars--;
      }else{
        i++;
      }
    }
    return nums;
};

function swap(a,b, array){
  var tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

//var array = [0,1,2,2,0,1,2,0,1,1,2];
var array = [1,2,0];
console.log(sortColors(array));