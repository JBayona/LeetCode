/*
Design a Leaderboard class, which has 3 functions:

addScore(playerId, score): Update the leaderboard by adding score to the given player's score.
If there is no player with such id in the leaderboard, add him to the leaderboard with the given score.
top(K): Return the score sum of the top K players.
reset(playerId): Reset the score of the player with the given id to 0 (in other words erase it
from the leaderboard). It is guaranteed that the player was added to the leaderboard before calling this function.
Initially, the leaderboard is empty.

https://leetcode.com/problems/design-a-leaderboard/
*/


var Leaderboard = function() {
  this.hash = {};
};

Leaderboard.prototype.addScore = function(playerId, score) {
  if(!(playerId in this.hash)) {
      this.hash[playerId] = 0;
  }
  this.hash[playerId] += score;
};

Leaderboard.prototype.top = function(K) {
  let values = Object.values(this.hash);
  values.sort((a, b) => b - a);
  let total = 0;
  let index = 0;
  while(index < K) {
      total += values[index++];
  }
  return total;
};

Leaderboard.prototype.reset = function(playerId) {
  this.hash[playerId] = 0;
};

// Python Heap
class Leaderboard:

    def __init__(self):
        self.scores = {}

    def addScore(self, playerId: int, score: int) -> None:
        if playerId not in self.scores:
            self.scores[playerId] = 0
        self.scores[playerId] += score

    def top(self, K: int) -> int:
    
        # This is a min-heap by default in Python.
        heap = []
        for x in self.scores.values():
            heapq.heappush(heap, x)
            if len(heap) > K:
                heapq.heappop(heap)
        res = 0
        while heap:
            res += heapq.heappop(heap)
        return res

    def reset(self, playerId: int) -> None:
        self.scores[playerId] = 0