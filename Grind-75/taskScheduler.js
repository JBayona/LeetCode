/*

Given a char array representing tasks CPU need to do. It contains capital letters A to Z where different letters represent different tasks.
Tasks could be done without original order. Each task could be done in one interval. For each interval, CPU could finish one task or just be idle.

However, there is a non-negative cooling interval n that means between two same tasks, there must be at least n intervals
that CPU are doing different tasks or just be idle.

You need to return the least number of intervals the CPU will take to finish all the given tasks.

Example:

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B.

Greedy Approach
https://www.youtube.com/watch?v=ySTQCRya6B0
https://leetcode.com/articles/task-scheduler/

*/
class Solution {
    public int leastInterval(char[] tasks, int n) {
        // Greedy Approach
        // https://www.youtube.com/watch?v=ySTQCRya6B0
        // We donn´t care about which process we are computing
        // we take the biggest task to reduce the posibility to
        // reduce the cooling period
        HashMap<Character, Integer> map = new HashMap<>();
        for(char c: tasks) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        
        // Get the max element under the maxHeap in constant time
        // Max heap, the bigger element is the one on the root so we
        // can access at constant timee.
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a,b) -> b -a);
        // Throw all values into the max heap
        maxHeap.addAll(map.values());
        
        int cycles = 0;
        while(!maxHeap.isEmpty()) {
            List<Integer> tmp = new ArrayList<>();
            // Try to run the tasks before the idle time
            // Prepare the tasks to run during the cycle
            for(int i = 0; i < n + 1; i++) {
                if(!maxHeap.isEmpty()) {
                    tmp.add(maxHeap.remove());
                }
            }
            
            // Decrement the process and check if we still
            // need to process more cycles, this cover cases
            // where A was computed and we still need to compute more
            for(int i : tmp) {
                if(--i > 0) {
                    maxHeap.add(i);
                }
            }
            
            // n is the cool down
            // If maxHeap is empty means we were able to process the heap, if not
            // it means we need to wait for the cooling cycle that´s whys is +1
            // becuase is inclusive
            cycles += maxHeap.isEmpty() ? tmp.size() : n + 1;
        }
        
        return cycles;
    }
}