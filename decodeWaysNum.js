/*
A: 1
B: 2
C: 3
...
Z: 26

'123' => ABC, LC, AW => 3

1, 2, 3
12, 3
1, 23



111

1, 11
11, 1
1, 1, 1


1001


2^n or n^2
*/


import java.io.*;
import java.util.*;

/*
 * To execute Java, please define "static void main" on a class
 * named Solution.
 *
 * If you need more classes, simply define them inline.
 */

class Solution {
  public static void main(String[] args) {
    test1();
  }
 
  public static void test1() {
    Compute compute = new Compute();
   
    System.out.println("123 : " + compute.getCombination("123"));
    System.out.println("1001 : " + compute.getCombination("1001"));
    System.out.println(" : " + compute.getCombination(""));
    System.out.println("26 : " + compute.getCombination("26"));
    System.out.println("0 : " + compute.getCombination("0"));
  }  
}


class Compute {
  int result = 0;
 
  int getCombination(String s) {
    if (s.length() == 0) {
      return 0;
    }
   
    result = 0;    // Reset
    helper(s, 0);
    return result;
  }
 
  void helper(String s, int idx) {
    // Terminate condition
    if (idx == s.length()) {
      result++;
      return;
    }
   
    // Single digit
    if (s.charAt(idx) != '0') {
      helper(s, idx + 1);
    }
   
    // exit if it is in the last digit of the string
    if (idx == s.length() - 1) return;
   
    // Double digit
    int twoDigits = Integer.valueOf(s.substring(idx, idx+1));
    if (twoDigits > 0 && twoDigits <= 26) {
      helper(s, idx + 2);
    }  
  }
}