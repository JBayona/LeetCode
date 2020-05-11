/*
If the frog's last jump was k units, then its next jump must be either k - 1, k, or k + 1 units.
Note that the frog can only jump in the forward direction.

Note:

The number of stones is ≥ 2 and is < 1,100.
Each stone's position will be a non-negative integer < 231.
The first stone's position is always 0.
Example 1:

[0,1,3,5,6,8,12,17]

There are a total of 8 stones.
The first stone at the 0th unit, second stone at the 1st unit,
third stone at the 3rd unit, and so on...
The last stone at the 17th unit.

Return true. The frog can jump to the last stone by jumping 
1 unit to the 2nd stone, then 2 units to the 3rd stone, then 
2 units to the 4th stone, then 3 units to the 6th stone, 
4 units to the 7th stone, and 5 units to the 8th stone.
Example 2:

[0,1,2,3,4,8,9,11]

Return false. There is no way to jump to the last stone as 
the gap between the 5th and 6th stone is too large.

https://leetcode.com/problems/frog-jump/
*/

var canCross = function(stones) {
  let map = {};
  // Format out hash
  for(let i = 0; i < stones.length; i++) {
      let stone = stones[i];
      map[stone] = new Set();
  }
  
  // Init
  map[0].add(0);
  
  for(let i = 0; i < stones.length; i++) {
      let stone = stones[i];
      // Convert the set into an array
      let array = Array.from(map[stone].values());
      
      // The set has from which rocks we can reach this value
      for(let i = 0; i < array.length; i++) {
          let jumps = array[i];
          // We can only jum k -1, k, k +1
          for(let i = -1; i < 2; i++) {
              let units = jumps + i;
              if((stone + units) in map) {
                  // We store how many units we need to reach the rock
                  map[stone + units].add(units);
              }
          }
      }
  }
  console.log(map);
  return map[stones[stones.length-1]].size > 0;
};