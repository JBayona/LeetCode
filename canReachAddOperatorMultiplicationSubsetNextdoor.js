/*
Given an array of non-negative integers and a value target, the task is to check if there
is a subset of the given array whose either addition or multiplication is equal to the given target. 
There's no constraint on the order, it could either start from left to right or viceversa
*/
/**
 * [1, 2, 3]
 *  -> [1]+[2]+[3]
 *  -> [1*2*3]
 *  -> [1*3]+[2]
 *  -> [1*2]+[3]
 *  -> [1]+[2*3]
/
// Time O(2^n)
function canReachTargetSubset(nums, target) {
  const subsets = generateSubsets(nums, 0, new Set([1])); // Start with 1 to avoid multiplication by 0
  return subsets.has(target);
}

function generateSubsets(nums, index, subsets) {
  // Base case, return the subset
  if (index === nums.length) {
    return subsets;
  }

  // Create all combination of subset by using the addition and the multiplication
  let newSubsets = new Set(subsets);
  for (let subset of subsets) {
    newSubsets.add(subset * nums[index]);
    newSubsets.add(subset + nums[index]);
  }
  newSubsets.add(nums[index]);

  return generateSubsets(nums, index + 1, newSubsets);
}

// Test cases
console.log(canReachTargetSubset([1, 2, 4, 5], 10)); // true
console.log(canReachTargetSubset([1, 2, 3], 7)); // true
console.log(canReachTargetSubset([1, 2, 4, 5], 100)); // false
