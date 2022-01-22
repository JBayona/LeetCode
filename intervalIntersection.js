/*
Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

(Formally, a closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.  The intersection of two closed intervals is a set of real numbers that is either empty, or can be represented as a closed interval.  For example, the intersection of [1, 3] and [2, 4] is [2, 3].)

Example 1:

Input: A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
Reminder: The inputs and the desired output are lists of Interval objects, and not arrays or lists.

https://leetcode.com/problems/interval-list-intersections/
*/

// Time O(N)
var intervalIntersection = function(firstList, secondList) {
    let indexA = 0;
    let indexB = 0;
    let result = [];
    
    if(!firstList.length || !secondList.length) {
        return [];
    }
    while(indexA < firstList.length && indexB < secondList.length) {
        let startMax = Math.max(firstList[indexA][0], secondList[indexB][0]);
        let endMin = Math.min(firstList[indexA][1], secondList[indexB][1]);
        
        // You have end greater than start and you already know that this interval is sorrounded
        // with startMin and endMax so this must be the intersection
        if(endMin >= startMax) {
            result.push([startMax, endMin]);
        }
        
        if(endMin === firstList[indexA][1]) {
            indexA++;
        }
        if(endMin === secondList[indexB][1]) {
            indexB++;
        }
    }
    return result;
};

// Opt 2
var intervalIntersection = function(A, B) {
    let indexA = 0;
    let indexB = 0;
    let result = [];
    
    while(indexA < A.length && indexB < B.length) {
      let intervalA = A[indexA];
      let intervalB = B[indexB];
      
      // First interval is greater then the second interval, need to move forwars
      if(intervalA[0] > intervalB[1]) {
          indexB++;
      } else if(intervalB[0] > intervalA[1]) { // Second interval is greater, we need to move forward
          indexA++;
      } else {
          // Here could have an overlap
          // Insert the max element from both intervals
          let start = Math.max(intervalA[0], intervalB[0]);
          // Take the min element as part of the overlap
          let end = Math.min(intervalA[1], intervalB[1]);
          result.push([start, end]);
          
          // Check against the last time as we could have a big interval, example
          // [[3,5],[9,20]]
          // [[4,5],[7,10],[11,12],[14,15],[16,20]]
          if(intervalA[1] < intervalB[1]) {
              indexA++;
          } else if(intervalB[1] < intervalA[1]) {
              indexB++;
          } else {
              // If both end intervals are the same, let´s move the interval whici is less
              // based on the start time
              if(intervalA[0] < intervalB[0]) {
                  indexA++;
              } else if(intervalB[0] < intervalA[0]) {
                  indexB++;
              } else {
                  // Move both pointers
                  indexA++;
                  indexB++;
              }
          }
      }
    }
    return result;
};