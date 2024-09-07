/*
You are given an integer n. There are n rooms numbered from 0 to n - 1.

You are given a 2D integer array meetings where meetings[i] = [starti, endi] means that a meeting will be held during the half-closed time interval [starti, endi). All the values of starti are unique.

Meetings are allocated to rooms in the following manner:

Each meeting will take place in the unused room with the lowest number.
If there are no available rooms, the meeting will be delayed until a room becomes free. The delayed meeting should have the same duration as the original meeting.
When a room becomes unused, meetings that have an earlier original start time should be given the room.
Return the number of the room that held the most meetings. If there are multiple rooms, return the room with the lowest number.

A half-closed interval [a, b) is the interval between a and b including a and not including b.

Example 1:
Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
Output: 0
Explanation:
- At time 0, both rooms are not being used. The first meeting starts in room 0.
- At time 1, only room 1 is not being used. The second meeting starts in room 1.
- At time 2, both rooms are being used. The third meeting is delayed.
- At time 3, both rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
- At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
Both rooms 0 and 1 held 2 meetings, so we return 0. 

Example 2:
Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
Output: 1
Explanation:
- At time 1, all three rooms are not being used. The first meeting starts in room 0.
- At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
- At time 3, only room 2 is not being used. The third meeting starts in room 2.
- At time 4, all three rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
- At time 6, all three rooms are being used. The fifth meeting is delayed.
- At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1. 

https://leetcode.com/problems/meeting-rooms-iii/description/?envType=company&envId=pinterest&favoriteSlug=pinterest-three-months
*/

// Approach: 
// 1. Have 2 queues, one queue will always get the earliest "endTime" so we can get the earliest meeting available, if there
// are meetings with the same time, the criteria will be the smaller id number which is the index. 
// 2. Have a separate queue that will always give us the smaller room available based on id. Whenever we detect there's a room
// available we will add into our queue the endTime and the id of the smallest room.
// 3. For each meeting book, check if we have rooms available by removing meetings ending equal or before the current meeting start time and
// add it into our available meeting.
// 4. If there are no meeting available, wait for the meeting and get the earliest meeting updating the endTime based on the first ending meeting
// and the current meeting -> Formula is: endTime + node.endTime - startTime
// 5. Increment an array with the index of the meeting every time is booked
// 6. Iterate and get the max meeting booked keeping the index

// Time Adding is O(LogN) for Priority queue
// Getting the element min/max is O(1)
// Time O(N Log N)
// Space O(N)
var mostBooked = function (n, meetings) {
  // Minheap that will always take the smallest room
  let rooms = new PriorityQueue({
    compare: (a, b) => a - b,
  });
  // Add all avialable rooms originall
  for (let i = 0; i < n; i++) {
    rooms.enqueue(i);
  }

  // Order based on start time
  meetings.sort((a, b) => a[0] - b[0]);
  // Number of meetings in each room
  let count = new Array(n).fill(0);

  // Minheap based on smaller end time
  let pq = new PriorityQueue({
    compare: (a, b) => {
      // If end time is the same, compare based on room
      if (a.endTime === b.endTime) {
        return a.room - b.room;
      }
      return a.endTime - b.endTime;
    },
  });

  for (let meeting of meetings) {
    [startTime, endTime] = meeting;
    // While there are meetings, remove all meeting already ended
    // comparing if the next meeting is equal of greater than front of queue
    // which is endtTime, this will make us to have morw available rooms
    while (!pq.isEmpty() && startTime >= pq.front().endTime) {
      // Add room as available again
      rooms.enqueue(pq.dequeue().room);
    }

    // Check if there is any room available, take the minimum one
    // we will always get the smallest available
    if (!rooms.isEmpty()) {
      let room = rooms.dequeue();
      pq.enqueue({ endTime: endTime, room: room });
      // Increment meeting used.
      count[room]++;
    } else {
      // Wait for a meeting to end
      let node = pq.dequeue();
      // Update the queue with the updated values. the updated end time is the time
      // where the meeting was supposed to start + the first meeting ending - start of the current meeting
      pq.enqueue({
        endTime: endTime + node.endTime - startTime,
        room: node.room,
      });
      count[node.room]++;
    }
  }

  // Get the room with the maximum number of bookings
  // As this is counting from 0 index to n, the result
  // will be already in order
  let result = 0;
  let max = -Infinity;
  for (let i = 0; i < count.length; i++) {
    let val = count[i];
    if (val > max) {
      max = val;
      result = i;
    }
  }
  return result;
};
