// Complexity O(kn Log(kn)) where k is the number of arrays we have
function mergeKSortedArrays(arrays) {
  let result = [];
  // Flat the array in a single array
  for(let i = 0; i < arrays.length; i++) {
    result = result.concat(arrays[i]);
  }
  // Sort the array
  bubbleSort(result);
  return result;
}

function bubbleSort(array) {
  for(let i = 0; i < array.length - 1; i++) {
    for(let j = 0; j < array.length - i - 1; j++) {
      if(array[j] > array[j+1]) {
        let tmp = array[j];
        array[j] = array[j+1];
        array[j+1] = tmp;
      }
    }
  }
}

arrays = [[1,4,7], [2,5,8], [3,6,9]];
console.log(mergeKSortedArrays(arrays));

// Complexity O(kn Log(N))

/*
[1, 4, 7]
[2, 5, 8]
[3, 6, 9]

Al inicio la queue tendrá 1,2,3
*/

private class QueueNode implements Comparable<QueueNode> {
  int array; // Array where it comes from
  int index; // index of the element
  int value; // Value

  public QueueNode(int array, int index, int value) {
    this.array = array;
    this.index = index;
    this.value = value;
  }

  public int compareTo(QueueNode n) {
    if (value > n.value) return 1;
    if (value < n.value) return -1;
    return 0;
  }
}

public int[] merge(int[][] arrays) {
  PriorityQueue<QueueNode> pq = new PriorityQueue<PriorityQueue>();

  int size = 0;
  for(int i = 0; i < arrays.length; i++) {
    size += arrays[i].length;
    // To avoid check empty arrays
    if(arrays[i].length > 0) {
      // At this point me add the first tre elements in the arrays
      pq.add(new QueueNode(i, 0, arrays[i][0]));
    }
  }

  int[] result = new int[size];
  for(int i = 0; !pq.isEmpty(); i++) {
    QueueNode n = pq.poll();
    int newIndex = n.index + 1;
    if(newIndex < arrays[n.array].length) {
      pd.add(new QueueNode(n.array, newIndex, arrays[n.array][newIndex]));
    }
  }

  return result;

}