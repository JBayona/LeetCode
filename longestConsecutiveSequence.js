/*
Given an unsorted array of integers, find the length of the longest
consecutive elements sequence.

For example:
Given [100,4,200,1,3,2] the longest consecutive sequence is [1,2,3,4];
So, the result is 4
*/

/*O(n) solution*/
function findLongestConseqSubseq(array){
  var map = {};
  var answer = 0;
  var visited = [];
  var element = null;
  var value = null;
  var left, right = 0;
  var currLen = 0;

  if(array.length === 0) return 0;

  /*The numbers are sorted in the map, example*/
  //{1:0, 2:6, 3:2, 4:4, 5:7, 9:1, 10:3, 20:5}
  for(let i = 0; i < array.length; i++){
    map[array[i]] = i;
  }
  console.log(map);

  for(var val in map){
    //Aqui tenemos el index
    element = map[val];
    if(visited[element]){
      continue;
    }

    /*Empezamos analizando los elementos del hash
    obteniendo el elemento left y right*/
    value = parseInt(val);
    left = value - 1;
    right = value + 1;
    currLen = 1;

    /*Si hay left, significa que el elemento no es el
    primero de la secuencia y que hay valores menores*/
    while(map.hasOwnProperty(left)){
      visited[map[left]] = true;
      currLen ++;
      left--;
    }

    /*Si no hay right, significa que el elemento es el
    primero de la secuencia*/
    while(map.hasOwnProperty(right)){
      visited[map[right]] = true;
      currLen ++;
      right++;
    }
    /*Debemos marcar el array como visited para no repetir
    la busqueda a aquellos elementos que ya analizamos, la busqueda
    es O(1) y el algoritmo tiene complejidad O(n)*/

    answer = currLen > answer ? currLen : answer;
  }

  return answer;

}

array = [1, 9, 3, 10, 4, 20, 2];
console.log(findLongestConseqSubseq(array));