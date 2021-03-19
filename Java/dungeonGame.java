// O(n m) time and O(m) space
/*
We can iterate from end to the start end keep tracking minimum initial value for each cell.

dp[n][m] = max(1, 1 - dungeon[n][m]); For example: if value in cell is positive,
we can have 1 hp, else we should have 1 - dungeon[n][m] points.
dp[i][j] = min(max(1, dp[i][j + 1] - dungeon[i][j]), max(1, dp[i+1][j] - dungeon[i][j]));
We should take best value from bottom or from right
Solution runs in O(n m) time and uses O(n m) space

https://leetcode.com/problems/dungeon-game/discuss/698231/Java-DP-solution-explained.-O(n-m)-time-and-O(m)-space
We can reduce to O(m) space. To calculate row dp[i] we only need results from dp[i+1], so we can use same array
*/
class Solution {
  public int calculateMinimumHP(int[][] dungeon) {
      int n = dungeon.length;
      int m = dungeon[0].length;
      int[] dp = new int[m];
      
      for (int i = n - 1; i >= 0; i--) {
        for (int j = m - 1; j >= 0; j--) {
          if (i + 1 == n && j + 1 == m) {
              dp[j] = Math.max(1 - dungeon[i][j], 1);
              continue;
          }
          
          if (i + 1 == n) {
              dp[j] = Math.max(dp[j + 1] - dungeon[i][j], 1);
          } else if (j + 1 == m) {
              dp[j] = Math.max(dp[j] - dungeon[i][j], 1);
          } else {
              int right = Math.max(dp[j + 1] - dungeon[i][j], 1);
              int down = Math.max(dp[j] - dungeon[i][j], 1);
              dp[j] = Math.min(right, down);
          }
        }
      }
      
      return dp[0];
  }
}