/*
There are n pieces arranged in a line, and each piece is colored either by 'A' or by 'B'.
You are given a string colors of length n where colors[i] is the color of the ith piece.

Alice and Bob are playing a game where they take alternating turns removing pieces from the line.
In this game, Alice moves first.

Alice is only allowed to remove a piece colored 'A' if both its neighbors are also colored 'A'.
She is not allowed to remove pieces that are colored 'B'.
Bob is only allowed to remove a piece colored 'B' if both its neighbors are also colored 'B'.
He is not allowed to remove pieces that are colored 'A'.
Alice and Bob cannot remove pieces from the edge of the line.
If a player cannot make a move on their turn, that player loses and the other player wins.
Assuming Alice and Bob play optimally, return true if Alice wins, or return false if Bob wins.

https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color/description/?envType=daily-question&envId=2023-10-02
*/

// Time O(N)
// Space O(1)
var winnerOfGame = function (colors) {
  let countDeletedA = 0;
  let countDeletedB = 0;
  // Ignore thee limits
  for (let i = 1; i < colors.length - 1; i++) {
    if (colors[i] === colors[i - 1] && colors[i] === colors[i + 1]) {
      if (colors[i] === "A") {
        countDeletedA++;
      } else {
        countDeletedB++;
      }
    }
  }
  // If Alice won, the deleted should be greater than B.
  return countDeletedA > countDeletedB;
};
