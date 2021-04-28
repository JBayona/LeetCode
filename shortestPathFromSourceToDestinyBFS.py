"""
Given a MxN matrix where each element can either be 0 or 1. We need to find
the shortest path between a given source cell to a destination cell.
The path can only be created out of a cell if its value is 1.
We can only move between 1, for 0 it´s not allowed.

Expected time complexity is O(MN).

"""

def shortest_path_between_source_and_destination(grid, source, destination):
  if not len(grid):
    return 0
  
  print(grid)
  ROW = len(grid)
  COL = len(grid[0])
  visited = [ [ 0 for i in range(ROW) ] for j in range(COL) ]
  
  x_start, y_start = source
  x_end, y_end = destination

  row = [0, -1, 0, 1];
  col = [-1, 0, 1, 0];

  queue = []
  queue.append((x_start, y_start, 0))
  while len(queue):
    x, y, d = queue.pop(0)
    # If we reach the destination
    if(x == x_end and y == y_end):
      return d

    for i in range(4):
      next_row = row[i] + x
      next_col = col[i] + y

      if is_safe(grid, next_row, next_col, visited):
        # Mark as visited
        visited[next_row][next_col] = 1
        queue.append((next_row, next_col, d + 1))

  # No path found
  return -1


def is_safe(grid, row, col, visited):
  ROW = len(grid)
  COL = len(grid[0])
  return (
    row >= 0 and row < ROW and
    col >= 0 and col < COL and
    grid[row][col] and
    not visited[row][col]
  )


grid = [ 
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1],
] # 5
"""grid = [ 
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
]""" #11
"""grid = [ 
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
]""" # 11
source = [0,0]
destination = [4,1]
print(shortest_path_between_source_and_destination(grid, source, destination))