// Design a data structure that can filter out a stream of messages
// based of intervals
// General Approach is to have a sorted array so we can run binary search
// to efficiently look and filter messages
// Time is O(Log N)
class MessageStore {
    constructor() {
      // Stores messages as objects with { timestamp: Date, message: String }
      this.messages = [];
    }
    // Helper function for binary search to find the index of the first message >= time
    binarySearch(time) {
      let left = 0;
      let right = this.messages.length - 1;
  
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (this.messages[mid].timestamp < time) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return left; // Position to insert or start checking
    }
  
    // Inserts a message and keeps the array sorted by timestamp
    insert(timestamp, message) {
      const position = this.binarySearch(timestamp);
      // Insert while keeping sorted order
      // position, deleteCount, insertElement
      this.messages.splice(position, 0, { timestamp, message });
    }
  
    // Filters and returns messages that fall within the [start, end] time interval
    // This is based on index
    filterMessages(start, end) {
      const startIdx = this.binarySearch(start);
      const endIdx = this.binarySearch(end);

      console.log(startIdx);
      console.log(endIdx);
  
      let result = [];
  
      for (let i = startIdx; i < this.messages.length && this.messages[i].timestamp <= end; i++) {
          result.push(this.messages[i]);
      }
      return result;
    }
  }
  
  // Example usage:
  const messageStore = new MessageStore();
  
  // messageStore.insert(new Date("2024-09-17T10:00:00"), "Message 1");
  // messageStore.insert(new Date("2024-09-17T10:05:00"), "Message 2");
  // messageStore.insert(new Date("2024-09-17T10:10:00"), "Message 3");
  // messageStore.insert(new Date("2024-09-17T10:15:00"), "Message 4");
  
  messageStore.insert(10, "Message 1");
  messageStore.insert(15, "Message 2");
  messageStore.insert(25, "Message 3");
  messageStore.insert(30, "Message 4");
  
  // Filter messages between 10:05 and 10:10
  // const filteredMessages = messageStore.filterMessages(
  //   new Date("2024-09-17T10:05:00"),
  //   new Date("2024-09-17T10:10:00")
  // );
  
  const filteredMessages = messageStore.filterMessages(10,24);
  
  console.log(filteredMessages);
  // Output: [ { timestamp: '2024-09-17T10:05:00', message: 'Message 2' }, { timestamp: '2024-09-17T10:10:00', message: 'Message 3' } ]
  