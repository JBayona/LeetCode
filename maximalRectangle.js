/*
Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example:

Input:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6

https://leetcode.com/problems/maximal-rectangle/
*/

// Time: O(n^2*m^2)
// Space: O(1)

var maximalRectangle = function(matrix) {
    let maxArea = 0;
    
    if(!matrix || !matrix.length) {
        return 0;
    }
    
    // Recorremos toda la matriz
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            // Estas variables nos ayudarán para sacar el área
            let rowCount = 1;
            let colCount = 1;
            let rowIndex = i;
            if(matrix[i][j] === '1') {
                // Siempre que encontremos un uno, lo intentaremos expander hacia la derecha
                // y hacia abajo
                while(rowIndex < matrix.length) {
                    // Expandemos columnas
                    let colCountTmp = 1;
                    for(let k = j + 1; k < matrix[i].length; k++) {
                        if(matrix[rowIndex][k] === '1') {
                            colCountTmp++;
                        } else {
                            break
                        }
                    }
                    // Si ya analizamos la primer columna, entonces nos quedamos con el mínimo de las
                    // columnas que pudimos expander porque puede ser que en u renglón pudimos expandir
                    // más columnas que en otra
                    if(rowCount > 1) {
                        colCount = Math.min(colCount, colCountTmp);
                    } else {
                        // Si es la primera, lo que pudimos expander sólo fué la primera
                        colCount = colCountTmp;
                    }
                    // Calculamos el max area
                    maxArea = Math.max(rowCount * colCount, maxArea);
                    // Expandemos las columnas si es posible movernos hacia abajo, es decir
                    // que sea un uno
                    if(rowIndex + 1 < matrix.length && matrix[rowIndex + 1][j] === '1') {
                        rowIndex++;
                        rowCount++;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    return maxArea;
};

