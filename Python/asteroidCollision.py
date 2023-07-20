"""
We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign
represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet
the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

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
"""

class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stack = []
        # Add the last element of the asteroids
        stack.append(asteroids.pop())
        while len(asteroids):
            a = stack[-1] if len(stack) else None
            b = asteroids[-1] if len(asteroids) else None
            # We´ll have a collision
            if (a and a < 0) and (b and b > 0):
                if abs(a) > abs(b):
                    asteroids.pop()
                elif abs(a) == abs(b):
                    asteroids.pop()
                    stack.pop()
                else:
                    stack.pop()
            else:
            # No collision
                stack.append(asteroids.pop())

        # Format result, reverse list
        return stack[::-1]