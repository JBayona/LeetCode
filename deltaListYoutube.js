/*
 * Given a list of sorted lists
 * L1 -> [0, 1, 2, 3, 4]
 *                 ^
 * L2 -> [1, 1, 2, 3, 5]
 *                 ^
 * L3 -> [3, 6, 7, 8, 9]
 *        ^
 *
 * Found the smallest delta such that
 *  Delta = max(e1, e2, e3...En) - min(e1, e2, e3, ... En);
 */

 function getDelta(array) {
   // Variable to store the index we should start from the list
   // having three list we'll have [0,0,0] if we have [2,1,0]
   // means we will start from index 2 in the first list, index 1 in the second list and from 0 in the third list
   let pointersMinIndex = new Array(array.length).fill(0);
   let minIndex = 0;
   let delta = Number.MAX_SAFE_INTEGER;
   while(delta !== 0 && pointersMinIndex[minIndex] < array[0].length) {
     // Always reset the values to keep track of the maximum and
     // minimum for every iteration of the list
     let minValue = Number.MAX_SAFE_INTEGER;
     let maxvalue = Number.MIN_SAFE_INTEGER;
     for(let i = 0; i < array.length; i++) {
       // Get the list
       let list = array[i];
       // Get the index we should start iteratinf in the list
       let index = pointersMinIndex[i];
       // Retrieve the value we should start from
       let val = list[index];
       // Find the minimum of the n lists we check in that iteration and
       // save the index to increment that later
       if(val < minValue) {
         minValue = val;
         minIndex = i;
       }
       // Track the max value of the elements
       maxvalue = Math.max(val, maxvalue);
     }
     // Get the updated delta
     delta = Math.min(maxvalue - minValue, delta);
     // Increment the index from where we found the last index
     pointersMinIndex[minIndex]++;
   }
   return delta;
 }

 l1 = [0, 1, 2, 3, 4];
 l2 = [1, 1, 2, 3, 5];
 l3 = [3, 6, 7, 8, 9];
 input = [l1, l2, l3];
 console.log(getDelta(input)); // Delta = 0