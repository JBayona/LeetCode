/*
Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0.
Find all unique triplets in the array which gives the sum of zero.
Note: The solution set must not contain duplicate triplets.

For example, given array S = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]

https://leetcode.com/problems/3sum/#/description
*/
// Time O(N)
// Space O(N)
var threeSum = function (nums) {
  // Sort the numbers, increasing order
  nums.sort((a, b) => a - b);

  let result = [];
  let len = nums.length;
  // Try to get the three sum
  // -2 as we consider the other two numbers
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates to avoid repetition
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let j = i + 1;
    let k = len - 1;
    // Exhaust all pointer options
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum === 0) {
        result.push([nums[i], nums[j], nums[k]]);

        // Skip duplicates for j
        while (j < k && nums[j] === nums[j + 1]) {
          j++;
        }

        // Skip duplicates for k
        while (j < k && nums[k] === nums[k - 1]) {
          k--;
        }

        // Move pointers
        j++;
        k--;
      } else if (sum < 0) {
        // Sum is less than zero, increment j to increase the sum
        j++;
      } else {
        // Sum is greater than zero, decrement k to decrease the sum
        k--;
      }
    }
  }
  return result;
};

var threeSum = function (nums) {
  //Ordena los elementos de menor a mayor
  nums.sort(function (a, b) {
    return a - b;
  });
  //Tamaño del array
  let len = nums.length;
  let result = [];

  for (let i = 0; i < len; i++) {
    /*Esta validación permite no tener
       combinaciones repetidas*/
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    //Metemos un elemento a nuestro array

    let j = i + 1;
    let k = len - 1;
    // Two Sum
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum === 0) {
        result.push([nums[i], nums[j], nums[k]]);

        // Skip duplicate elements for j
        while (j < k && nums[j] === nums[j + 1]) {
          j++;
        }

        // Skip duplicate elements for k
        while (j < k && nums[k] === nums[k - 1]) {
          k--;
        }
        // Move our pointers
        j++;
        k--;
      } else if (sum < 0) {
        // Sum is less than zero, increment j to increase the sum
        j++;
      } else {
        // Sum is greater than zero, decrement k to decrease the sum
        k--;
      }
    }
  }
  return result;
};

// Option 2
var threeSum = function (nums) {
  // Sort the array to handle easier
  nums.sort((a, b) => a - b);

  // No more than 3 elements in the array
  if (nums.length < 3) {
    return [];
  }
  let set = new Set();
  for (let i = 0; i < nums.length - 2; i++) {
    let next = i + 1;
    let end = nums.length - 1;
    while (next < end) {
      let sum = nums[i] + nums[next] + nums[end];
      // We found a match
      if (sum === 0) {
        set.add(nums[i] + "." + nums[next] + "." + nums[end]);
        next++;
        end--;
      } else if (sum > 0) {
        end--;
      } else {
        next++;
      }
    }
  }
  // Format the response
  let result = [];
  for (let el of set) {
    result.push(el.split(".").map(Number));
  }
  return result;
};

// Option 3
function threeSum(nums) {
  //Ordena los elementos de menor a mayor, con esto evitamos números repetidos.
  nums.sort((a, b) => a - b);
  //Tamaño del array
  var len = nums.length;
  var result = [];
  var currentSol = [];

  for (var i = 0; i < len; i++) {
    /*Esta validación permite no tener
        combinaciones repetidas*/
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    //Metemos un elemento a nuestro array
    currentSol.push(nums[i]);
    /*Mandamos el arreglo actual, nuestra solución, el start index que
        es un lugar después del elemento del array, el index final que es el
        último elemento, el que vamos a buscar en la pila pero con signo contrario
        para igualarlo y el arreglo completo, por ejemplo, si tenemos en el arreglo
        el 4, ponemos -4 para encontrarlo y así hacerlo cero*/
    twoSum(result, currentSol.concat(), i + 1, len - 1, -nums[i], nums);
    //Sacamos el elemento y avanzamos al siguiente
    currentSol.pop();
  }

  return result;
}

function twoSum(allSol, curSol, startIndex, endIndex, target, nums) {
  var start = startIndex;
  var end = endIndex;
  var sum = 0;
  //Mientas que el start sea menor que end
  while (start < end) {
    sum = nums[start] + nums[end];
    //Si sum es igual a nuestro target cons signo contrario
    if (sum === target) {
      /*Metemos al array los otros dos elemento para  completar
          los tres elementos, lo metemos a la matrix*/
      curSol.push(nums[start]);
      curSol.push(nums[end]);
      allSol.push(curSol.concat());
      //Limpiamos los elementos que agregamos del index final e inicial
      curSol.pop();
      curSol.pop();
      //Avanzamos ya que vamos a seguir analizando,se avanzan ambas posiciones
      start++;
      end--;

      //Aqui hacemos este chequeo para no repetir  analizar los mismos números.
      while (nums[start] === nums[start - 1]) {
        start++;
      }

      while (nums[end] === nums[end + 1]) {
        end--;
      }
    } else if (sum < target) {
      //Si es menor, debemos avanzar
      start++;
    } else {
      //Si es mayor debemos disminuir
      end--;
    }
  }
}

S = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(S));
