/*
A move consists of taking a point (x, y) and transforming it to either (x, x+y) or (x+y, y).

Given a starting point (sx, sy) and a target point (tx, ty), return True if and only if a sequence
of moves exists to transform the point (sx, sy) to (tx, ty). Otherwise, return False.

Examples:
Input: sx = 1, sy = 1, tx = 3, ty = 5
Output: True
Explanation:
One series of moves that transforms the starting point to the target is:
(1, 1) -> (1, 2)
(1, 2) -> (3, 2)
(3, 2) -> (3, 5)

Input: sx = 1, sy = 1, tx = 2, ty = 2
Output: False

Input: sx = 1, sy = 1, tx = 1, ty = 1
Output: True

https://leetcode.com/problems/reaching-points/
*/

/*              (5,3)            
           (2,3)
                (2,5)
x = 1 (2, 1)  
            (2, 5)

ty = 100            (9, 49) (9, 58) (9, 67) (9, 76) (9, 95)
sy = 40       (9, 40)
100 - 40 = 60
sx = 9
tx = 9
*/
var reachingPoints = function(sx, sy, tx, ty) {
    // We reach the target from sx and sy
    if(sx == tx && sy == ty) {
        return true;
    }
    // We exceed the boundaries so we can not reach the targets
    if(sx > tx || sy > ty) {
        return false;
    }
    // We should not change tx anymore as we already reach sx and tx
    // We need to check if we can reach sy by manipulating ty.
    // By doing the difference between our target - sy and finding if it's
    // divisible by sx means that we can continue using sx to reach sy
    if(sx == tx) {
        return (ty - sy) % sx === 0
    }
    // We should not change ty anymore as we already reach sy and ty
    // We need to check if we can reach sx by manipulating tx.
    // By doing the difference between our target - sx and finding if it's
    // divisible by sy means that we can continue using sy to reach sx
    if(sy == ty) {
        return (tx - sx) % sy === 0
    }
    // As we are walking inverse, we need to get the difference to see
    // if we can reach sx and sy, it's the opposite so that's why we
    // use the difference and the targets.
    if(tx > ty) {
        return reachingPoints(sx, sy, tx - ty, ty)
    } else if(ty > tx){
        return reachingPoints(sx, sy, tx, ty - tx);
    }
    return false;
};

// Option 2
var reachingPoints = function(sx, sy, tx, ty) {
    if(sx == tx && sy == ty) {
        return true;
    }
    if(sx > tx || sy > ty) {
        return false;
    }
    return reachingPoints(sx+sy, sy, tx, ty) || reachingPoints(sx, sy+sx, tx, ty);
};