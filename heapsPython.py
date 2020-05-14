# Hello World program in Python
    
import heapq
"""
Arr[(i-1)/2] Returns the parent node.
Arr[(2*i)+1] Returns the left child node.
Arr[(2*i)+2] Returns the right child node.
"""
def heaps(min, max):
    
    # Min heap
    heapq.heapify(min)
    # Max heap
    max = [-x for x in max]
    heapq.heapify(max)
    
    # Insert values into the min heap
    heapq.heappush(min, 4)
    
    # Insert values into the max heap
    heapq.heappush(max, -99)
    
    print('Get the smallests in the heap')
    while len(min) > 0:
        print(heapq.heappop(min))
    
    # Los resultados saldrán en negativos
    print('Get the greatest in the heap')
    while len(max) > 0:
        print(heapq.heappop(max))
    
    
    
    
    
min = [2, 5, 8, 19, 20, 3, 1];
max = [2, 5, 8, 19, 20, 3, 1];
heaps(min, max)