/*
Right a javascode algorith that:
- Simulate two parallel jobs accesing the same resource.
- The job will send a list of numbers to persist into a diferent list (assuming it can't fit in memory)
- Calling getMin will always get the global min across all elements.
- Both jobs are contributing to the pool of the shared resources.
*/

class SharedResource {
  constructor() {
    this.globalMin = Infinity;
    this.dataPool = [];
  }

  async persistNumbers(numbers) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.dataPool.push(...numbers);
        this.updateGlobalMin(numbers);
        resolve();
      }, Math.random() * 1000); // Simulate random processing time
    });
  }

  updateGlobalMin(numbers) {
    for (let num of numbers) {
      if (num < this.globalMin) {
        this.globalMin = num;
      }
    }
  }

  getMin() {
    return this.globalMin;
  }
}

async function job(sharedResource, numbers) {
  await sharedResource.persistNumbers(numbers);
  console.log(`Processed numbers: ${numbers}`);
}

const sharedResource = new SharedResource();

const numbers1 = [10, 5, 20, 3];
const numbers2 = [8, 2, 15, 4];

Promise.all([
  job(sharedResource, numbers1),
  job(sharedResource, numbers2),
]).then(() => {
  console.log(`Global Min: ${sharedResource.getMin()}`);
});
