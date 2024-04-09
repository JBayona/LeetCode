/*
The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers 0 and 1 respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.

The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step:

If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue.
Otherwise, they will leave it and go to the queue's end.
This continues until none of the queue students want to take the top sandwich and are thus unable to eat.

You are given two integer arrays students and sandwiches where sandwiches[i] is the type of the i​​​​​​th sandwich in the stack (i = 0 is the top of the stack) and students[j] is the preference of the j​​​​​​th student in the initial queue (j = 0 is the front of the queue). Return the number of students that are unable to eat.

https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/description/
*/

// Option 1
var countStudents = function (students, sandwiches) {
  let countA = 0;
  let countB = 0;
  // Count students preferences
  for (let pref of students) {
    if (pref === 1) {
      countA++;
    } else {
      countB++;
    }
  }

  // Check availability
  for (let sandwich of sandwiches) {
    if (sandwich === 1 && countA > 0) {
      countA--;
    } else if (sandwich === 0 && countB > 0) {
      countB--;
    } else {
      // No more options to satifsy selections
      return countA + countB;
    }
  }
  return 0;
};
