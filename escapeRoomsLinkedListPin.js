/*
Overview
Imagine that you are building a leaderboard for an Escape Room Center.
There are N escape rooms and M participants. When the game starts, each participant is in the first room and progresses
through each of the rooms after solving the corresponding puzzle. We can assume that if multiple participants are in the same room,
they each have to figure out the puzzle before being able to move on to the next room, so each participant progresses independently.

Instructions
Explain the problem and the variables at stake (this will be important later to understand the time and space complexity of the problem).
You can paste the questions section below (including diagram), but don't provide any method signature or sample input / output, as this is expected to be discussed with the candidate.

Questions
Write a function to count how many participants are currently in a given room. Time complexity = O(1)
Write a function to return a leaderboard with the top x participants (those who have progressed the most through the game).
If multiple participants are in the same room, those who entered the room first should be returned in priority. Time complexity = O(N + K)

You will need to write a utility function that will get called each time a participant has progressed to the next room (they can only go from room r to room r + 1).
You don't have to worry about how this function is called, you just need to write the body of the function. Ideally, this utility function should run in O(1).

Example:

Initial state

|---P0—P1—P2—P3—|---------------------|---------------------|--------------------|
              R0                             R1                    R2                     R3
We call these functions to get to the Intermediate state below:
increment(P2)
increment(P2)
increment(P2)
increment(P0)
increment(P3)

Intermediate state
P2 has progressed to the last room, while P1 is still in the first
P0 entered R1 before P3
The top(2) participants are therefore [P2, P0], in this order

|--------------P1—------—|----P0—---P3----|---------------------|--------P2--------|
               R0                            R1                    R2                       R3

Additional Data
If they need help here's some functions signatures to get them started:
// 1) increment(playerId) => void. O(1)
// 2) topPlayers(numPlayers) => [array of playerIds]. (as fast as possible)
// 3) numPlayersInRoom(roomId) => number
// 4) initialize(numPlayer, numRooms)

Follow-up Questions / Variations
If the answer to the first question isn't optimal regarding time complexity, ask how they would change the logic (using extra space is allowed)
For the second question, ask about alternative approaches to get the result (for example, they can keep track of which rooms currently have participants in them, to speed up the lookup).
Leaning more on a light system design question for the most advanced candidates, you can ask how they would build a simple notification system to notify that a participant moved to a new room,
assuming a very large number of participants. Let's say that we have a network of escape games, and want to get the leaderboard for all the participants across North America for example, assuming all
the games start at the same time and have the same number of rooms.

Potential clarifying questions
Q: Are there any time complexity requirements for each of the functions?
A: The first function should run in constant time, the second, top(K), should run in no more than  O(N + K), and can be improved by using extra space.
Q: What is the beginning state? How do we break ties?
A: Initially all the participants are in the first room, and their order doesn't matter (there is no ranking at this point). In each subsequent room, ranking is based on the order of entry (first arrived are ranked first).
Example Solutions
This is a complete Python example solution - once the candidate has the right idea, some of the classes and initializations can be pasted directly into Coderpad,
to focus on the more interesting parts. I added comments on possible variations or why certain choices were made.
*/

function Node(val, next, prev) {
  this.next = next || null;
  this.prev = prev || null;
  this.val = val;
}

/*
  1. Room Initialization (Empty Room: 0 participants)
  ---------------------------------------------------
  Both dummy nodes point directly to one another:

     +---------------+                   +---------------+
     |  Dummy HEAD   | ──── .next ─────> |  Dummy TAIL   |
     |   (val: 0)    | <─── .prev ────── |   (val: 0)    |
     +---------------+                   +---------------+
         |                                   |
       .prev = null                        .next = null


  2. After Adding Participant 0
  -----------------------------
  Participant 0 is spliced cleanly between HEAD and TAIL:

     +---------------+                   +---------------+                   +---------------+
     |  Dummy HEAD   | ──── .next ─────> |    Node P0    | ──── .next ─────> |  Dummy TAIL   |
     |   (val: 0)    | <─── .prev ────── |   (val: 0)    | <─── .prev ────── |   (val: 0)    |
     +---------------+                   +---------------+                   +---------------+


  3. Populated Room (Multiple Participants: P0, P1, P2)
  -----------------------------------------------------
  Order of entry flows from HEAD (earliest) to TAIL (most recent):

     +----------+         +---------+         +---------+         +---------+         +----------+
     |  Dummy   | ─next─> | Node P0 | ─next─> | Node P1 | ─next─> | Node P2 | ─next─> |  Dummy   |
     |   HEAD   | <─prev─ | (first) | <─prev─ | (mid)   | <─prev─ | (last)  | <─prev─ |   TAIL   |
     +----------+         +---------+         +---------+         +---------+         +----------+
*/

function Room() {
  // List of participants in the order in which they entered the room
  // initialized with a dummy head and tail
  this.head = new Node(0);
  this.tail = new Node(0);
  // Initialize to an empty list with dummy head and tail
  // link them together the double linked list so we add
  // elements to the end of the list and remove them from the middle of the list
  this.head.next = this.tail;
  this.tail.prev = this.head;

  // Mapping participant id -> node object in the above list
  this.idToNode = {};
}

class Solution {
  // Initialize the rooms and participants
  constructor(n, m) {
    this.rooms = [];
    // Create a room for each of the N rooms
    // each room has its own double linked lists depending on the number of participants in that room
    for (let i = 0; i < n; i++) {
      this.rooms.push(new Room());
    }

    this.nParticipants = m;
    // Map the current participant id to their current room
    this.currentRoom = {};
    for (let i = 0; i < m; i++) {
      this.currentRoom[i] = 0;
    }

    let firstRoom = this.rooms[0];
    let current = firstRoom.head;
    for (let i = 0; i < m; i++) {
      let node = new Node(i);
      current.next = node;
      node.prev = current;
      current = node; // Move forward
      firstRoom.idToNode[i] = node;
    }

    // Close the doubly-linked list with the dummy tail:
    current.next = firstRoom.tail;
    firstRoom.tail.prev = current;
  }
  increment(participantId) {
    let currentRoomId = this.currentRoom[participantId];

    // If the candidate is already in the last room, they can't progress further
    if (currentRoomId === this.rooms.length - 1) {
      return;
    }

    let room = this.rooms[currentRoomId];
    let participant = room.idToNode[participantId];
    let previousParticipant = participant.prev;
    let nextParticipant = participant.next;

    // Remove this participant from this room (prev and next are always defined since the list has a dummy head and tail)
    previousParticipant.next = nextParticipant;
    nextParticipant.prev = previousParticipant;
    delete room.idToNode[participantId];

    // Add this participant to the next room
    let newRoom = this.rooms[currentRoomId + 1];
    newRoom.idToNode[participantId] = participant;

    // Reorganize the connections
    newRoom.tail.prev.next = participant;
    participant.prev = newRoom.tail.prev;
    newRoom.tail.prev = participant;
    participant.next = newRoom.tail;

    this.currentRoom[participantId] = currentRoomId + 1;
  }
  // Get the number of participants in the room with the id room.
  getCount(roomId) {
    return Object.keys(this.rooms[roomId].idToNode).length;
  }
  // Get the top K participants, ordered by the room they are in and the order of entry into that room
  top(k) {
    let result = [];
    for (let i = this.rooms.length - 1; i >= 0; i--) {
      let node = this.rooms[i].head.next; // skip dummy head
      while (node && node.next && result.length < k) { // skip dummy tail
        result.push(node.val);
        node = node.next;
      }
    }
    return result;
  }
}

let obj = new Solution(4, 5); // n = room, m = participants
console.log(`count in room 0: ${obj.getCount(0)}`); // 5
obj.increment(3);
obj.increment(2);
console.log(`count in room 1: ${obj.getCount(1)}`); // 2
console.log(`count in room 2: ${obj.getCount(2)}`); // 0
obj.increment(3);
obj.increment(1);
console.log(`count in room 2: ${obj.getCount(2)}`); // 1
obj.increment(4);
obj.increment(3);
console.log(`count in room 1: ${obj.getCount(1)}`); // 3
obj.increment(1);
console.log(obj.top(3)); // [3, 1, 4] or [3, 1, 2]


/*
  Initial State of Room 0 (After constructor runs with n=4 rooms, m=5 participants: P0 to P4)
  ==========================================================================================

  rooms[0] Doubly-Linked List:
  ----------------------------
  +----------+         +---------+         +---------+         +---------+         +---------+         +---------+         +----------+
  |  Dummy   | ─next─> | Node P0 | ─next─> | Node P1 | ─next─> | Node P2 | ─next─> | Node P3 | ─next─> | Node P4 | ─next─> |  Dummy   |
  |   HEAD   | <─prev─ | (val=0) | <─prev─ | (val=1) | <─prev─ | (val=2) | <─prev─ | (val=3) | <─prev─ | (val=4) | <─prev─ |   TAIL   |
  +----------+         +---------+         +---------+         +---------+         +---------+         +---------+         +----------+
      |                                                                                                                         |
    .prev = null                                                                                                              .next = null


  rooms[0].idToNode Mapping (O(1) direct lookup to any node in room 0):
  ---------------------------------------------------------------------
  {
    0: -> [Node P0],
    1: -> [Node P1],
    2: -> [Node P2],
    3: -> [Node P3],
    4: -> [Node P4]
  }


  Global Tracking:
  ----------------
  this.currentRoom = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }  (All participants start in room 0)
  rooms[1], rooms[2], rooms[3] = Empty (HEAD <-> TAIL directly)
*/

/*
  Intermediate State Diagram
  ==========================
  Example scenario from the prompt:
    - R0 has P1 remaining
    - R1 has P0 (entered first) and P3 (entered second)
    - R2 is empty
    - R3 has P2

  this.rooms Array:
  -----------------

  rooms[0]  (1 participant: P1)
  +----------+         +---------+         +----------+
  |  Dummy   | ─next─> | Node P1 | ─next─> |  Dummy   |
  |   HEAD   | <─prev─ | (val=1) | <─prev─ |   TAIL   |
  +----------+         +---------+         +----------+

  rooms[1]  (2 participants: P0 arrived before P3)
  +----------+         +---------+         +---------+         +----------+
  |  Dummy   | ─next─> | Node P0 | ─next─> | Node P3 | ─next─> |  Dummy   |
  |   HEAD   | <─prev─ | (val=0) | <─prev─ | (val=3) | <─prev─ |   TAIL   |
  +----------+         +---------+         +---------+         +----------+
                        ^ Earliest          ^ Latest
                          arrival             arrival

  rooms[2]  (0 participants: EMPTY)
  +----------+                             +----------+
  |  Dummy   | ────────── .next ─────────> |  Dummy   |
  |   HEAD   | <───────── .prev ────────── |   TAIL   |
  +----------+                             +----------+

  rooms[3]  (1 participant: P2)
  +----------+         +---------+         +----------+
  |  Dummy   | ─next─> | Node P2 | ─next─> |  Dummy   |
  |   HEAD   | <─prev─ | (val=2) | <─prev─ |   TAIL   |
  +----------+         +---------+         +----------+


  How `top(2)` reads this:
  -----------------------
  Scans rooms from right to left (R3 -> R2 -> R1 -> R0):
    1. Inspect R3: reads [P2]
    2. Inspect R2: empty (HEAD.next is TAIL), skips immediately
    3. Inspect R1: reads HEAD to TAIL -> takes [P0]
    Result: [P2, P0]
*/