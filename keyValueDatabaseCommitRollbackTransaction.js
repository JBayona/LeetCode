/*
Write the solution for the problem below:
Part 1:Create an in-memory database that accepts the following commands:
1. void set(String name, String value): Set the record <name> to <value>, overwriting the existing record if any.
2. String get(String name): Return the value of the record <name>, or null if that record doesn't exist.
3. void unset(String name): Delete the record <name>, making it just like that record was never set.
4: int numWithValue(String value): Return the number of records that are currently set to. If no records equal that value, return 0.
*/

// Part 1:
class Database {
  constructor() {
    this.data = {}; // Store the key-value pairs
    this.valueCount = {}; // Store the count of each value
  }

  // Set the record <name> to <value>
  set(name, value) {
    // If we need to override, the count should be updated, decremented by 1
    if (name in this.data) {
      const oldValue = this.data[name];
      this._decrementValueCount(oldValue);
    }
    this.data[name] = value;
    this._incrementValueCount(value);
  }

  // Return the value of the record <name>, or null if it doesn't exist
  get(name) {
    return name in this.data ? this.data[name] : null;
  }

  // Delete the record <name>
  unset(name) {
    if (name in this.data) {
      const oldValue = this.data[name];
      this._decrementValueCount(oldValue);
      delete this.data[name];
    }
  }

  // Return the number of records that have the given <value>
  numWithValue(value) {
    return this.valueCount[value] || 0;
  }

  // Helper method to increment the count of a value
  _incrementValueCount(value) {
    if (!(value in this.valueCount)) {
      this.valueCount[value] = 0;
    }
    this.valueCount[value]++;
  }

  // Helper method to decrement the count of a value
  _decrementValueCount(value) {
    if (value in this.valueCount) {
      this.valueCount[value]--;
      if (this.valueCount[value] === 0) {
        delete this.valueCount[value];
      }
    }
  }
}

// Example usage
const db = new Database();

db.set("name", "Alice");
db.set("age", "30");
console.log(db.get("name")); // Alice
console.log(db.numWithValue("Alice")); // 1

// Override the name property
db.set("name", "Bob");
console.log(db.numWithValue("Alice")); // 0
console.log(db.numWithValue("Bob")); // 1

db.unset("age");
console.log(db.get("age")); // null
console.log(db.numWithValue("30")); // 0
