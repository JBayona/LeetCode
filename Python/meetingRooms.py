"""
Given an array of meeting time intervalsof start and end times [[s1,ed], [s2, e2]..] determine if a
person coudld attend al meetings

Description: https://aaronice.gitbook.io/lintcode/sweep-line/meeting-rooms

https://leetcode.com/problems/meeting-rooms/
https://www.youtube.com/watch?v=i2bBG7CaVxs
https://github.com/JBayona/Facebook-Interview-Coding-1/blob/master/253.%20Meeting%20Rooms%20II.java
"""

# Greedy algorithm
# Time O(N)
# Space O(1)
def canAttendMeetings(intervals):
    intervals = sorted(intervals, key = lambda x: [x[0], x[1]])
    
    prev = intervals[0]
    print(intervals)
    for i in range(1, len(intervals)):
        # If there's an overlap, it's not possible to attend the meeetings
        if intervals[i][0] < prev[1]:
            return False
        prev = intervals[i]
        
    return True
        

# meetings = [[0,30],[5,10],[15,20]] # Output: False
meetings = [[7,10],[2,4]] # Output: True
print(canAttendMeetings(meetings))