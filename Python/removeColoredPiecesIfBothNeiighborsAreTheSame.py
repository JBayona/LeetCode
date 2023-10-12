"""
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
"""

# Time O(N)
# Space O(1)


class Solution:
    def winnerOfGame(self, colors: str) -> bool:
        count_A = 0
        count_B = 0
        for i in range(1, len(colors) - 1):
            if colors[i] == colors[i-1] == colors[i+1]:
                if colors[i] == 'A':
                    count_A += 1
                else:
                    count_B += 1

        return count_A > count_B
