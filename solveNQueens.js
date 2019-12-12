/*
The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both
indicate a queen and an empty space respectively.

https://leetcode.com/problems/n-queens/submissions/
https://www.youtube.com/watch?v=xouin83ebxE
*/

class Solution {
  class Position {
      int row, col;
      Position(int row, int col) {
          this.row = row;
          this.col = col;
      }
  }

  public Position[] solveNQueenOneSolution(int n) {
      Position[] positions = new Position[n];
      boolean hasSolution = solveNQueenOneSolutionUtil(n, 0, positions);
      if (hasSolution) {
          return positions;
      } else {
          return new Position[0];
      }
  }
  
  private boolean solveNQueenOneSolutionUtil(int n, int row, Position[] positions) {
      if (n == row) {
          return true;
      }
      int col;
      for (col = 0; col < n; col++) {
          boolean foundSafe = true;

          //check if this row and col is not under attack from any previous queen.
          for (int queen = 0; queen < row; queen++) {
              if (positions[queen].col == col || positions[queen].row - positions[queen].col == row - col ||
                      positions[queen].row + positions[queen].col == row + col) {
                  foundSafe = false;
                  break;
              }
          }
          if (foundSafe) {
              positions[row] = new Position(row, col);
              if (solveNQueenOneSolutionUtil(n, row + 1, positions)) {
                  return true;
              }
          }
      }
      return false;
  }
  
  public List<List<String>> solveNQueens(int n) {
      List<List<String>> result = new ArrayList<>();
      Position[] positions = new Position[n];
      solve(0, positions, result, n);
      return result;
  }

  public void solve(int current, Position[] positions, List<List<String>> result, int n) {
      if (n == current) {
          StringBuffer buff = new StringBuffer();
          List<String> oneResult = new ArrayList<>();
          for (Position p : positions) {
              for (int i = 0; i < n; i++) {
                  if (p.col == i) {
                      buff.append("Q");
                  } else {
                      buff.append(".");
                  }
              }
              oneResult.add(buff.toString());
              buff = new StringBuffer();

          }
          result.add(oneResult);
          return;
      }

      for (int i = 0; i < n; i++) {
          boolean foundSafe = true;
          for (int j = 0; j < current; j++) {
              if (positions[j].col == i || positions[j].col - positions[j].row == i - current || positions[j].row + positions[j].col == i + current) {
                  foundSafe = false;
                  break;
              }
          }
          if (foundSafe) {
              positions[current] = new Position(current, i);
              solve(current + 1, positions, result, n);
          }
      }
  }
}