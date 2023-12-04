

export function gridExpandSearch(grid, row, col) {
    const directions = [[0, 1], [0, -1]]; // Right and Left directions

    const queue = [[row, col]];
    const visited = new Set();

    const resultCoordinates = [];

    while (queue.length > 0) {
        let [currentRow, currentCol] = queue.shift();

        if (visited.has([currentRow, currentCol].join('|'))) {
            throw new Error('Already visited');
        }
        
        let value = parseInt(grid[currentRow][currentCol]);
        
        visited.add([currentRow, currentCol].join('|'));

        if (!isNaN(value)) {
            // it is a numeric digit
            resultCoordinates.push([currentRow, currentCol]);
        }

        for (let i = 0; i < directions.length; i++) {
            const [rowOffset, colOffset] = directions[i];
            const newRow = currentRow + rowOffset;
            const newCol = currentCol + colOffset;

            // Check boundaries
            if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
                continue;
            }
            if (visited.has([newRow, newCol].join('|'))) {
                continue;
            }
            let nextValue = parseInt(grid[newRow][newCol]);

            if (!isNaN(nextValue)) {
                queue.push([newRow, newCol]);
            }
        }
    }

    // sort coordinates in ascending order
    resultCoordinates.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    return resultCoordinates;
}
