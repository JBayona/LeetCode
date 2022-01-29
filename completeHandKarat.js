/*
You're creating a game with some amusing mini-games, and you've decided to make
a simple variant of the game Mahjong.

In this variant, players have a number of tiles, each marked 0-9. The tiles can be grouped
into pairs or triples of the same tile. For example, if a player has "33344466", the player's hand has
a triple of 3s, a triple of 4s, and a pair of 6s.
Similarly, "55555777" has a triple of 5s, a pair of 5s, and a triple of 7s.

A "complete hand" is defined as a collection of tiles where all the tiles can be  grouped into
any number of triples (zero or more) and exactly one pair, and each tile is used in exactly one triple or pair.
Write a function that takes a string representation of a collection of tiles in no particular order
and returns true or false depending on whether or not the collection represents a complete hand.

0 or more triples.
exactly 1 pair
No singles.
*/

function isCompleteHand(hand){
  let hash = {};
  for(let i = 0; i < hand.length; i++) {
    let n = hand[i];
    if(!(n in hash)) {
      hash[n] = 1;
    } else {
     hash[n]++; 
    }
  }
  // Compute the hand
  let triple = false;
  let pair = false;
  for(let prop in hash) {
    let val = hash[prop];
    if(val > 2 && val % 3 === 2) {
      if(pair) {
        return false;
      } else {
        pair = true; 
      }
      triple = true;
    } else if(val % 3 === 0) {
      triple = true;
    } else if(val === 2) {
      if(pair) {
        return false;
      } else {
        pair = true; 
      }
    } else {
      // Singles
      return false;
    }
  }
  return (triple && pair) || (!triple && pair);
}

const tiles1 = "11133555";
const tiles2 = "111333555";
const tiles3 = "00000111";
const tiles4 = "13233121";
const tiles5 = "11223344555";
const tiles6 = "99999999";
const tiles7 = "999999999";
const tiles8 = "9";
const tiles9 = "99";
const tiles10 = "000022";
const tiles11 = "888889";
const tiles12 = "889";
const tiles13 = "88888844";
const tiles14 = "77777777777777";
const tiles15 = "1111111";
const tiles16 = "1111122222";

console.log(isCompleteHand(tiles1));
console.log(isCompleteHand(tiles2));
console.log(isCompleteHand(tiles3));
console.log(isCompleteHand(tiles4));
console.log(isCompleteHand(tiles5));
console.log(isCompleteHand(tiles6));
console.log(isCompleteHand(tiles7));
console.log(isCompleteHand(tiles8));
console.log(isCompleteHand(tiles9));
console.log(isCompleteHand(tiles10));
console.log(isCompleteHand(tiles11));
console.log(isCompleteHand(tiles12));
console.log(isCompleteHand(tiles13));
console.log(isCompleteHand(tiles14));
console.log(isCompleteHand(tiles15));
console.log(isCompleteHand(tiles16));

/*complete(tiles1)  => True
complete(tiles2)  => False
complete(tiles3)  => True
complete(tiles4)  => True
complete(tiles5)  => False
complete(tiles6)  => True
complete(tiles7)  => False
complete(tiles8)  => False
complete(tiles9)  => True
complete(tiles10) => False
complete(tiles11) => False
complete(tiles12) => False
complete(tiles13) => True
complete(tiles14) => True
complete(tiles15) => False
complete(tiles16) => False*/
