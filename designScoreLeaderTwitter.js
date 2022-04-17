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

/** 
* @param {number} playerId 
* @param {number} score
* @return {void}
*/
Leaderboard.prototype.addScore = function(playerId, score) {
  if(!(playerId in this.hash)) {
      this.hash[playerId] = 0;
  }
  this.hash[playerId] += score;
};

/** 
* @param {number} K
* @return {number}
*/
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

/** 
* @param {number} playerId
* @return {void}
*/
Leaderboard.prototype.reset = function(playerId) {
  this.hash[playerId] = 0;
};

/** 
* Your Leaderboard object will be instantiated and called as such:
* var obj = new Leaderboard()
* obj.addScore(playerId,score)
* var param_2 = obj.top(K)
* obj.reset(playerId)
*/