/*
Given an array of events where events[i] = [startDayi, endDayi].
Every event i starts at startDayi and ends at endDayi.
You can attend an event i at any day d where startTimei <= d <= endTimei.
Notice that you can only attend one event at any time d.

Return the maximum number of events you can attend.

https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/
*/

// Greedy algorithm
// Sort events by endDay;
// We greedily attend the event that ends sooner.
// For each event, if we can attend a event, we increment the result count.
// Time Complexity: O(NK) = O(N^2) = O(10^5 * 10^5)
var maxEvents = function(events) {
    // Sort based on end time, from less to greater value
    events.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);
    let attended = new Array(100001).fill(false); // 10^5
    
    let answer = 0;
    let lastFound = 0;
    // Iterate through the events
    for(let i = 0; i < events.length; i++) {
        let [start, end] = events[i];
        // Check if the current event starts at the same time of the previous event
        let init = (i > 0 && events[i-1][0] == start) ? lastFound : start;
        for(let j = init; j <= end; j++) {
            // Try to acomodate to the soonest available spot
            if(attended[j] === false) {
                attended[j] = true;
                // Track where we were able to accommodate the last event.
                lastFound = j;
                answer++;
                break;
            }
        }
    }
    return answer;
};
