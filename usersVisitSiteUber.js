// Generate a system that can keep track of users visiting one-time and more than 1 visitors. Generate the next two
// APIs.
// 1. Post every time a user is recording data.
// 2. Get the first user with first access
// Space required O(1)

class Tracker {
  constructor() {
    this.map = {};
    this.set = new Set();
    this.firstUser = null;
  }
  registerVisit(userId) {
    if (!(userId in this.map)) {
      this.map[userId] = 1;
      this.set.add(userId);

      // Set the first visitor if the user has never been on the system before
      if (!this.firstUser) {
        this.firstUser = userId;
      }
    } else {
        this.map[userId]++;
        this.set.delete(userId);

        // Update the first visitor
        this.updateFirstUser();
    }
  }
  updateFirstUser() {
    this.firstUser = this.set.size ? this.set.values().next().value : null;
  }
  getFirstUser() {
    return this.firstUser || null;
  }
}

let obj = new Tracker();
obj.registerVisit('user1');
console.log(obj.getFirstUser());
obj.registerVisit('user2');
console.log(obj.getFirstUser());
obj.registerVisit('user1');
console.log(obj);
console.log(obj.getFirstUser());
obj.registerVisit('user3');
console.log(obj.getFirstUser());
obj.registerVisit('user2');
console.log(obj.getFirstUser());