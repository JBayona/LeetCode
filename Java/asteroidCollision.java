/*
We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents
its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode.
If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

Example 1:
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

Example 2:
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.

Example 3:
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

https://leetcode.com/problems/asteroid-collision/description/
*/

class Solution {
  public int[] asteroidCollision(int[] asteroids) {
    List<Integer> list = Arrays.stream(asteroids).boxed().collect(Collectors.toList());
    Stack<Integer> stack = new Stack<>();
    stack.push(list.remove(list.size() - 1));

    while (!list.isEmpty()) {
      Integer a = stack.empty() ? null : stack.peek();
      Integer b = list.get(list.size() - 1);
      if ((a != null && a < 0) && (b > 0)) {
        if (Math.abs(a) > Math.abs(b)) {
          list.remove(list.size() - 1);
        } else if (Math.abs(a) == Math.abs(b)) {
          list.remove(list.size() - 1);
          stack.pop();
        } else {
          stack.pop();
        }
      } else {
        stack.push(list.remove(list.size() - 1));
      }
    }

    List<Integer> result = new ArrayList(stack);
    Collections.reverse(result);
    return result.stream()
        .mapToInt(Integer::intValue)
        .toArray();
  }
}