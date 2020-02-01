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


var numDecodings = function(s) {
	result = 0;
	helper(s, 0);
	return result;
};

function helper(s, index) {
    if(index == s.length) {
        result++;
        return
    }
    
    // One digit
    let oneDigit = Number(s.charAt(index));
    if(oneDigit != 0) {
        helper(s, index + 1);
    }
    
    // Two digit
    let twoDigit = s.substring(index, index + 2);
    
    // If we have a zero at the beginning, is not valid
    if(twoDigit.charAt('0') === '0') {
        return;
    }
    
    if(twoDigit > 0 && twoDigit <= 26) {
        helper(s, index + 2);
    }
}


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

// Op
import java.io.*;

import java.util.*;


/*
A: 1
B: 2
C: 3
...
Z: 26


'123' => ABC, LC, AW => 3
dp[0] = 1;
dp[1] = dp[0];
dp[i-1]
dp[i] 
dp[i+1] = dp[i] + dp[i-1]
0 -> len
 */


// space O(n) where n is the length of the string
// runtime O(n) where n is the length of the string


class Solution {
  public static void main(String[] args) {
    int res1 = getDecodeWays("123");
    System.out.println(res1);
  }

  private static int getDecodeWays(String s) {
    if(s.length() == 0)  return 0;
    int[] dp = new int[s.length() + 1];
    dp[0] = 1;

    for(int i = 0; i < s.length(); i++) {
      // check one digit
      int oneDigit = Integer.parseInt(s.substring(i, i+1));
      if(oneDigit >= 1 && oneDigit <= 9) {
        dp[i+1] += dp[i];
      }

      // check two digit
      if(i -1 >= 0) {
        int twoDigits = Integer.parseInt(s.substring(i-1, i+1));
        if(twoDigits >= 10 && twoDigits <= 26) {
          dp[i+1] += dp[i-1];
        }
      }
    } 
    return dp[s.length()];
  }
}


import java.io.*;
import java.util.*;

/*
A: 1
B: 2
C: 3
...
Z: 26

'123' => ABC, LC, AW => 3
dp[0] = 1;
dp[1] = dp[0];
dp[i-1]
dp[i] 
dp[i+1] = dp[i] + dp[i-1]

0 -> len
 */


// space O(n) where n is the length of the string
// runtime O(n) where n is the length of the string


class Solution {
  public static void main(String[] args) {
    int res1 = getDecodeWays("12201");
    System.out.println(res1);
  }

  private static int getDecodeWays(String s) {
    if(s.length() == 0)  return 0;
    int last1 = 1, last2 = 1;
    for(int i = 0; i < s.length(); i++) {
      int cur = 0;
      // check one digit
      int oneDigit = Integer.parseInt(s.substring(i, i+1));
      if(oneDigit >= 1 && oneDigit <= 9) {
        cur += last1;
      }

      // check two digit
      if(i -1 >= 0) {
        int twoDigits = Integer.parseInt(s.substring(i-1, i+1));
        if(twoDigits >= 10 && twoDigits <= 26) {
          cur += last2;
        }
      }
      last2 = last1;
      last1 = cur; 
    }
    return last1;
  }
}

// Op2
// Space O(1)
// Time O(N)

import java.io.*;
import java.util.*;


/*
A: 1
B: 2
C: 3
...

Z: 26

'123' => ABC, LC, AW => 3
dp[0] = 1;
dp[1] = dp[0];
dp[i-1]
dp[i] 
dp[i+1] = dp[i] + dp[i-1]
0 -> len
 */


// space O(n) where n is the length of the string
// runtime O(n) where n is the length of the string
class Solution {
  public static void main(String[] args) {
    int res1 = getDecodeWays("12201");
    System.out.println(res1);
  }

  private static int getDecodeWays(String s) {
    if(s.length() == 0)  return 0;
    int last1 = 1, last2 = 1;
    for(int i = 0; i < s.length(); i++) {
      int cur = 0;
      // check one digit
      int oneDigit = Integer.parseInt(s.substring(i, i+1));
      if(oneDigit >= 1 && oneDigit <= 9) {
        cur += last1;
      }

      // check two digit
      if(i -1 >= 0) {
        int twoDigits = Integer.parseInt(s.substring(i-1, i+1));
        if(twoDigits >= 10 && twoDigits <= 26) {
          cur += last2;
        }
      }
      last2 = last1;
      last1 = cur; 

    } 
    return last1;
  }
}