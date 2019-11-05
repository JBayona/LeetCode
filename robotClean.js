/*
Robot Room cleaner
Given a robot cleaner in a room modeled as a grid.

Each cell in the grid can be empty or blocked.

The robot cleaner with 4 given APIs can move forward, turn left or turn right. Each turn it made is 90 degrees.

When it tries to move into a blocked cell, its bumper sensor detects the obstacle and it stays on the current cell.

Design an algorithm to clean the entire room using only the 4 given APIs shown below.

interface Robot {
  // returns true if next cell is open and robot moves into the cell.
  // returns false if next cell is obstacle and robot stays on the current cell.
  boolean move();

  // Robot will stay on the same cell after calling turnLeft/turnRight.
  // Each turn will be 90 degrees.
  void turnLeft();
  void turnRight();

  // Clean the current cell.
  void clean();
}
Example:

Input:
room = [
  [1,1,1,1,1,0,1,1],
  [1,1,1,1,1,0,1,1],
  [1,0,1,1,1,1,1,1],
  [0,0,0,1,0,0,0,0],
  [1,1,1,1,1,1,1,1]
],
row = 1,
col = 3

Explanation:
All grids in the room are marked by either 0 or 1.
0 means the cell is blocked, while 1 means the cell is accessible.
The robot initially starts at the position of row=1, col=3.
From the top left corner, its position is one row below and three columns right.
Notes:

The input is only given to initialize the room and the robot's position internally. You must solve this problem "blindfolded". In other words, you must control the robot using only the mentioned 4 APIs, without knowing the room layout and the initial robot's position.
The robot's initial position will always be in an accessible cell.
The initial direction of the robot will be facing up.
All accessible cells are connected, which means the all cells marked as 1 will be accessible by the robot.
Assume all four edges of the grid are all surrounded by wall.

0 grados = x - 1
90 grados = y + 1
180 grados = x + 1
270 grados = y - 1

https://www.cnblogs.com/grandyang/p/9988250.html
https://www.youtube.com/watch?v=sUVwpP3Y4i0&feature=youtu.be&fbclid=IwAR3ysAFDdjdCFTxdjvJ1aWqHtMLKrRthl4j4XerNmR28C_AHm-npPaBfjkA
*/

var cleanRoom = function(robot) {
  let visited = {};
  // 0 up
  // 90 right
  // 180 down
  // 270 right
  helper(0, 0, 0, visited)
}

function helper(x, y, currentDirection, visited) {
  if(visited[x + ',' + y]) {
    return;
  }
  // Clean current direction
  robot.clean();
  visited[x + ',' + y] = true;

  // For each direction try to go there
  for(let i = 0; i < 4; i++) {
    if(robot.move()) {
        // Calculate current direction
      let currentX = x;
      let currentY = y;
      switch(currentDirection) {
        case 0: currentX = x-1; break;
        case 90: currentY = y+1; break;
        case 180: currentX = x+1; break;
        case 270: currentY = y-1; break;
      }
      helper(currentX, currentY, currentDirection, visited);
      // After clean x,y go back
      robot.turnLeft();
      robot.turnLeft();
      robot.move();
      robot.turnRight();
      robot.turnRight();
    }
    // Move to next direction
    robot.turnRight();
    currentDirection += 90;
    currentDirection %= 360;
  }
}