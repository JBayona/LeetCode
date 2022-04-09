/*
Given two sparse vectors, compute their dot product.

Implement class SparseVector:

SparseVector(nums) Initializes the object with the vector nums
dotProduct(vec) Compute the dot product between the instance of SparseVector and vec
A sparse vector is a vector that has mostly zero values, you should store the sparse
vector efficiently and compute the dot product between two SparseVector.

Follow up: What if only one of the vectors is sparse?
Example 1:
Input: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0]
Output: 8
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 1*0 + 0*3 + 0*0 + 2*4 + 3*0 = 8

Example 2:
Input: nums1 = [0,1,0,0,0], nums2 = [0,0,0,0,2]
Output: 0
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 0*0 + 1*0 + 0*0 + 0*0 + 0*2 = 0

Example 3:
Input: nums1 = [0,1,0,0,2,0,0], nums2 = [1,0,0,0,3,0,4]
Output: 6

https://leetcode.com/problems/dot-product-of-two-sparse-vectors/
*/

// Option 1
var SparseVector = function (nums) {
  this.hash = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      this.hash[i] = nums[i];
    }
  }
};

// Return the dotProduct of two sparse vectors
/**
 * @param {SparseVector} vec
 * @return {number}
 */
SparseVector.prototype.dotProduct = function (vec) {
  let hash1 = this.hash;
  let hash2 = vec.hash;
  let result = 0;
  for (let n in hash1) {
    if (n in hash2) {
      result += hash1[n] * hash2[n];
    }
  }
  return result;
};

// Option 2
var SparseVector = function (nums) {
  this.array = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      this.array.push([i, nums[i]]);
    }
  }
};

// Return the dotProduct of two sparse vectors
/**
 * @param {SparseVector} vec
 * @return {number}
 */
SparseVector.prototype.dotProduct = function (vec) {
  let arrayA = this.array;
  let arrayB = vec.array;
  let indexA = 0;
  let indexB = 0;
  let result = 0;
  while (indexA < arrayA.length && indexB < arrayB.length) {
    let [idxA, valA] = arrayA[indexA];
    let [idxB, valB] = arrayB[indexB];
    if (idxA === idxB) {
      result += valA * valB;
      indexA++;
      indexB++;
    } else if (idxA < idxB) {
      indexA++;
    } else {
      indexB++;
    }
  }
  return result;
};

// Your SparseVector object will be instantiated and called as such:
// let v1 = new SparseVector(nums1);
// let v2 = new SparseVector(nums2);
// let ans = v1.dotProduct(v2);
