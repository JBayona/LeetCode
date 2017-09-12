/*
Given a list of array, return a list of arrays, each array is a combination of one element in each given array.
Let me give you an example to help you understand the question 
Suppose the input is [[1, 2, 3], [4], [5, 6]], the output 
should be [[1, 4, 5], [1, 4, 6], [2, 4, 5], [2, 4, 6], [3, 4, 5], [3, 4, 6]].

http://blog.gainlo.co/index.php/2017/01/05/uber-interview-questions-permutations-array-arrays/
*/

//Recursion

/*Permutation arrays of arrays*/
//Problema similar a numeros de marcacion
function permutationsOfArray(arrays){
  return  permutations(arrays, 0, arrays.length, ['']);
}

function permutations(arrays, index, len, result){
  var length = result.length;
  var next = [];
  //var tmp = '';
  var tmp = [];

  //Stop recursion
  if(index === len) return result;

  for(var i = 0; i < length; i++){
    for(var j = 0; j < arrays[index].length; j++){
      /*Creamos un arreglo nuevo para no tener 
      referencias de los resultados al modificar*/
      tmp = [...result[i], arrays[index][j]];
      //tmp = result[i].toString() + arrays[index][j].toString();
      next.push(tmp);
    }
  }
  return permutations(arrays, index+1, len, next);
}

arrays = [[1, 2, 3], [4], [5, 6]];
console.log(permutationsOfArray(arrays));