/*
Given the availability time slots arrays slots1 and slots2 of two people and a meeting duration duration,
return the earliest time slot that works for both of them and is of duration duration.

If there is no common time slot that satisfies the requirements, return an empty array.

The format of a time slot is an array of two elements [start, end] representing an inclusive time range from start to end.  

It is guaranteed that no two availability slots of the same person intersect with each other.
That is, for any two time slots [start1, end1] and [start2, end2] of the same person, either start1 > end2 or start2 > end1.

 

Example 1:

Input: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8
Output: [60,68]
Example 2:

Input: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 12
Output: []
*/

var minAvailableDuration = function(slots1, slots2, duration) {
    // Sort interval based on start time
    slots1.sort((a, b) => a[0] - b[0]);
    slots2.sort((a, b) => a[0] - b[0]);
    
    let indexSlot1 = 0;
    let indexSlot2 = 0;
    
    while(indexSlot1 < slots1.length && indexSlot2 < slots2.length) {
        let free1 = slots1[indexSlot1];
        let free2 = slots2[indexSlot2];
        
        // If first employee start time is greater, it means that second employee need to find a time later
        // first employee has time after employee 2
        if(free1[0] > free2[1]) {
            indexSlot2++;
        } else if(free2[0] > free1[1]) {
            indexSlot1++;
        } else {
            // We could have an overlap here so let's find a good time for both employees
            // Take the start time where both are available, by getting the max
            let start = Math.max(free1[0], free2[0]);
            // Tajke the time both employees are available by getting the min
            let end = Math.min(free2[1], free1[1]);
            // if our time range has at least the required direction we got the result
            if(end - start >= duration) {
                return [start, start+duration];
                // We may have the case where second employee does not have the required length per duration and
                // we need to find a greater interval
            } else if(free1[1] > free2[1]) {
                indexSlot2++;
            } else { // Same case but opposite
                indexSlot1++;
            }
        }
    }
    return [];
};