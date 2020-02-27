function howManyDays(matrix) {
    let ROW = matrix.length;
    let COL = matrix[0].length;

    let totalServers = ROW * COL;
    let serverOn = 0;
    let days = 0;


    while (getAvailableServers(matrix) < totalServers) {
        for(let i = 0; i < ROW; i++) {
            for(let j = 0; j < COL; j++) {
                // If there's a server available (1)
                if(matrix[i][j]) {
                    connectServers(matrix, i, j);
                }
            }
        }
        days++;
    }

    return days;
}

function connectServers(matrix, row, col) {
    let rowK = [-1, 0, 1,  0];
    let colK = [ 0, 1, 0, -1];

    for(let i = 0; i < 4; i++) {
        let ROW = row + rowK[i];
        let COL = col + colK[i];

        if(isValid(matrix, ROW, COL)) {
            matrix[ROW][COL] = 1;
        }
    }
}

function isValid(matrix, row, col) {
    let ROW = matrix.length;
    let COL = matrix[0].length;

    return (
        (row >= 0 && row < ROW) &&
        (col >= 0 && col < COL) &&
        (matrix[row][col] === 0)
    );
}

function getAvailableServers(matrix) {
    let ROW = matrix.length;
    let COL = matrix[0].length;
    let serverOn = 0;
    for(let i = 0; i < ROW; i++) {
        for(let j = 0; j < COL; j++) {
            if(matrix[i][j]) {
                serverOn++;
            }
        }
    }
    return serverOn;
}

matrix = [
    [0, 0, 0, 1 ],
    [0, 0, 1, 0 ],
    [0, 0, 1, 0 ],
    [0, 0, 1, 0 ]
];
console.log(howManyDays(matrix));