/*
You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks
where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process
at enqueueTimei and will take processingTimei to finish processing.

You have a single-threaded CPU that can process at most one task at a time and will act in the following way:

If the CPU is idle and there are no available tasks to process, the CPU remains idle.
If the CPU is idle and there are available tasks, the CPU will choose the one with the
shortest processing time. If multiple tasks have the same shortest processing time, it will choose the task
with the smallest index.
Once a task is started, the CPU will process the entire task without stopping.
The CPU can finish a task then start a new one instantly.
Return the order in which the CPU will process the tasks.

https://leetcode.com/problems/single-threaded-cpu/description/
*/
// MinHeap
// https://github.com/datastructures-js/priority-queue/blob/v5/README.md
// Time O(NlogN) -> N for the tasks and LogN is the enqueue & dequeue cost
// Space O(N)
class Task {
    int index;
    int enqueueTime;
    int processingTime;
    public Task(int index, int enqueueTime, int processingTime) {
        this.index = index;
        this.enqueueTime = enqueueTime;
        this.processingTime = processingTime;
    }
}

class Solution {
    public int[] getOrder(int[][] tasks) {
        // Format data
        List<Task> data = new ArrayList<>();
        for (int i = 0; i < tasks.length; i++) {
            data.add(new Task(i, tasks[i][0], tasks[i][1]));
        }

        // Order based on enqueue time as it will be the first one to process
        data.sort((a, b) -> a.enqueueTime - b.enqueueTime);

        // Define preority queue
        PriorityQueue<Task> heap = new PriorityQueue<>(
            // If both have the same processing time, take the smallest index, oterwise take
            // the smallest processing time
            (Task t1, Task t2 ) -> t1.processingTime == t2.processingTime ?
            t1.index - t2.index : t1.processingTime - t2.processingTime
        );

        int[] order = new int[data.size()];
        int arrIndex = 0;
        // Start with first time
        int t = data.get(0).enqueueTime;
        int i = 0;
        while (heap.size() > 0 || i < data.size()) {
            // Add all tasks that needs to be enqued before the time
            while (i < data.size() && t >= data.get(i).enqueueTime) {
                heap.add(data.get(i));
                i++;
            }
            // Either move if the heap has tasks or take the current
            // time to process
            if (heap.size() > 0) {
                Task node = heap.poll();
                order[arrIndex++] = node.index;
                // Simulate it was processed already
                t += node.processingTime;
            } else {
                t = data.get(i).enqueueTime;
            }
        }
        return order;
    }
}