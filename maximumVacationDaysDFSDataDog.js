/*
LeetCode wants to give one of its best employees the option to travel
among n cities to collect algorithm problems. But all work and no play makes Jack a dull boy,
you could take vacations in some particular cities and weeks. Your job is to schedule the traveling
to maximize the number of vacation days you could take, but there are certain rules and restrictions you
need to follow.

Rules and restrictions:

1. You can only travel among n cities, represented by indexes from 0 to n - 1. Initially, you are in
the city indexed 0 on Monday.
2. The cities are connected by flights. The flights are represented as an
n x n matrix (not necessarily symmetrical), called flights representing the airline status from the city
i to the city j. If there is no flight from the city i to the city j, flights[i][j] == 0;
Otherwise, flights[i][j] == 1. Also, flights[i][i] == 0 for all i.
3. You totally have k weeks (each week has seven days) to travel. You can only take flights at most
once per day and can only take flights on each week's Monday morning. Since flight time is so short
we do not consider the impact of flight time.
4. For each city, you can only have restricted vacation days in different weeks, given an n x k matrix
called days representing this relationship. For the value of days[i][j], it represents the maximum
days you could take a vacation in the city i in the week j.
5. You could stay in a city beyond the number of vacation days, but you should work on the extra days
which will not be counted as vacation days.
6. If you fly from city A to city B and take the vacation on that day, the deduction towards vacation
days will count towards the vacation days of city B in that week.
7. We do not consider the impact of flight hours on the calculation of vacation days.
Given the two matrices flights and days, return the maximum vacation days you could take during k weeks.

Example 1:
Input: flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[1,3,1],[6,0,3],[3,3,3]]
Output: 12
Explanation:
One of the best strategies is:
1st week : fly from city 0 to city 1 on Monday, and play 6 days and work 1 day.
(Although you start at city 0, we could also fly to and start at other cities since it is Monday.)
2nd week : fly from city 1 to city 2 on Monday, and play 3 days and work 4 days.
3rd week : stay at city 2, and play 3 days and work 4 days.
Ans = 6 + 3 + 3 = 12.

Example 2:
Input: flights = [[0,0,0],[0,0,0],[0,0,0]], days = [[1,1,1],[7,7,7],[7,7,7]]
Output: 3
Explanation:
Since there are no flights that enable you to move to another city, you have to stay at city 0 for the whole 3 weeks. 
For each week, you only have one day to play and six days to work.
So the maximum number of vacation days is 3.
Ans = 1 + 1 + 1 = 3.

Example 3:
Input: flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[7,0,0],[0,7,0],[0,0,7]]
Output: 21
Explanation:
One of the best strategies is:
1st week : stay at city 0, and play 7 days.
2nd week : fly from city 0 to city 1 on Monday, and play 7 days.
3rd week : fly from city 1 to city 2 on Monday, and play 7 days.
Ans = 7 + 7 + 7 = 21

https://leetcode.com/problems/maximum-vacation-days
*/

// Goal - Schedule the travel maximizing the vacations
// Approach
// 1. Check the number of vacactions it can be taken starting from currentCity and weekno starting week.
// 2. Check which city it's connected and possible to flight
// 3. We need to check whether it's more convenient to travel to city j or stay in the same city.
// 4. After changing cities, we need to find out the number of vacations we can take from the new city
// Brute force
// Time O(n^k) Depth of Recursion tree will be k and each node contains n branches in the worst case. Here n represents the number of cities and k is the total number of weeks.
// Space O(k). The depth of the recursion tree is k.
var maxVacationDays = function(flights, days) {
    let currentCity = 0;
    let weekNumber = 0;
    return dfs(flights, days, currentCity, weekNumber);
};

function dfs(flights, days, currentCity, weekNumber) {
    // It checks whether you've already processed all weeks
    // days[0].length if the number of weeks. If weekNumber == days[0].length
    // means all weeks have gone and there are no weeks left
    if (weekNumber === days[0].length) {
        return 0;
    }
    let maxVac = 0;
    for (let i = 0; i < flights.length; i++) {
        // Check if we can fly to a differetn city or stay
        if (flights[currentCity][i] === 1 || i === currentCity) {
            let vac = days[i][weekNumber] + dfs(flights, days, i, weekNumber + 1);
            // Try to maximize
            maxVac = Math.max(maxVac, vac);
        }
    }
    return maxVac;
}

// Improved with Memoization
// Time O(n^2K) Depth of Recursion tree will be k and each node contains n branches in the worst case.
// // Here n represents the number of cities and k is the total number of weeks.
// Space O(k). The depth of the recursion tree is k.
var maxVacationDays = function(flights, days) {
    let currentCity = 0;
    let weekNumber = 0;
    let memo = {}
    return dfs(flights, days, currentCity, weekNumber, memo);
};

function dfs(flights, days, currentCity, weekNumber, memo) {
    // It checks whether you've already processed all weeks
    // days[0].length if the number of weeks. If weekNumber == days[0].length
    // means all weeks have gone and there are no weeks left
    if (weekNumber === days[0].length) {
        return 0;
    }

    let key = `${currentCity}-${weekNumber}`;
    if (key in memo) {
        return memo[key];
    }

    let maxVac = 0;
    for (let i = 0; i < flights.length; i++) {
        // Check if we can fly to a differetn city or stay
        if (flights[currentCity][i] === 1 || i === currentCity) {
            let vac = days[i][weekNumber] + dfs(flights, days, i, weekNumber + 1, memo);
            // Try to maximize
            maxVac = Math.max(maxVac, vac);
        }
    }
    memo[key] = maxVac;
    return maxVac;
}