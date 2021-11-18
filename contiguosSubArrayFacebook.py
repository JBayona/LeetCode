"""
You are given an array arr of N integers. For each index i, you are required to determine the number of
contiguous subarrays that fulfill the following conditions:

The value at index i must be the maximum element in the contiguous subarrays, and
These contiguous subarrays must either start from or end on index i.

Signature
int[] countSubarrays(int[] arr)
Input
Array arr is a non-empty list of unique integers that range between 1 to 1,000,000,000
Size N is between 1 and 1,000,000

Output
An array where each index i contains an integer denoting the maximum number of contiguous subarrays of arr[i]
Example:
arr = [3, 4, 1, 6, 2]
output = [1, 3, 1, 5, 1]

Explanation:
For index 0 - [3] is the only contiguous subarray that starts (or ends) with 3, and the maximum value in this subarray is 3.
For index 1 - [4], [3, 4], [4, 1]
For index 2 - [1]
For index 3 - [6], [6, 2], [1, 6], [4, 1, 6], [3, 4, 1, 6]
For index 4 - [2]

We can use an additional data structure and keep the index of
the previous greater (ignore elements less current one) element for left and right parts.
Then calculate the distance between left and right index plus 1 (arr of single current element).

It's additional memory, but time complexity is O(n).
"""

def countContiguousSubArray(arr):
  left_max = [0 for i in range(len(arr))]
  right_max= [0 for i in range(len(arr))]
  result = [0 for i in range(len(arr))]
  
  # Stack of the max
  max = []
  for i in range(len(arr)):
    if not max:
      left_max[i] = i
      max.append(i)
    else:
      # We need to make sure that the current element is greater
      # than the previous element, so we only track of that index
      # Keep the max index of the previous integer from the left
      while max and arr[max[-1]] < arr[i]:
        max.pop()

      # + 1 because it´s tracking the previous max
      left_max[i] = 0 if not max else max[-1] + 1
      # New max
      max.append(i)

  max = []
  for i in reversed(range(len(arr))):
    if not max:
      right_max[i] = i
      max.append(i)
    else:
      # We need to make sure that the current element is greater
      # than the previous element, so we only track of that index
      # Keep the max index of the previous integer from the right
      while max and arr[max[-1]] < arr[i]:
        max.pop()
      
      # As we have moving from right to left, the  index if no max is found
      # is the last one, otherwise get the prev max - 1 as we are coming from right
      right_max[i] = len(arr) - 1 if not max else max[-1] - 1
      max.append(i)
  
  for i in range(len(arr)):
    result[i] = (right_max[i] - left_max[i]) + 1
  
  return result
      

arr = [3, 4, 1, 6, 2]; # expected = [1, 3, 1, 5, 1]
# arr = [5,4,1,2,6,3,7] # expected = [4,3,1,2,6,1,7]
# arr = [2, 4, 7, 1, 5, 3] # expected = [1, 2, 6, 1, 3, 1 ]
print(countContiguousSubArray(arr))
