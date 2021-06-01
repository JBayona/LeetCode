/*
On a single threaded CPU, we execute some functions. Each function has a unique id between 0 and N-1.
We store logs in timestamp order that describe when a function is entered or exited.

Each log is a string with this format: "{function_id}:{"start" | "end"}:{timestamp}". 
For example, "0:start:3" means the function with id 0 started at the beginning of timestamp 3. "1:end:2" means
the function with id 1 ended at the end of timestamp 2.

A function's exclusive time is the number of units of time spent in this function.  Note that this does
not include any recursive calls to child functions.

The CPU is single threaded which means that only one function is being executed
at a given time unit.

Return the exclusive time of each function, sorted by their function id.
https://leetcode.com/problems/exclusive-time-of-functions/
*/

// Time O(N).
// Space O(N).
var exclusiveTime = function(n, logs) {
    let stack = [];
    let result = new Array(n).fill(0);
    for(let i = 0; i < logs.length; i++) {
        let process = logs[i];
        let [id, instruction, time] = process.split(':');
        id = Number(id);
        time = Number(time);
        // Insert in the stack every start process
        if(instruction === 'start') {
            stack.push([id, time]);
        } else {
            // when we need to end the process, we need to get the
            // calculation we spent in the process
            let [topId, topTime] = stack.pop();
            result[topId] += time - topTime + 1;
            // This validation will cover cases where we have previous
            // running process
            if(stack.length) {
                let [prevId, prevTime] = stack[stack.length - 1];
                result[prevId] -= time - topTime + 1;
            }
        }
    }
    return result;
};
