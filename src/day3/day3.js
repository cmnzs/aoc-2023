import fs from 'fs';
import path from 'path';
import { gridExpandSearch } from './gridExpandSearch.js';

// const sampleInput =
//     `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

const sampleInput = fs.readFileSync(path.join('./src/day3/day3.txt'), 'utf8');

const parsed = sampleInput.split('\n').map(row => row.split(''));

function getSymbolCoordinates(parsed) {
    const coordinates = [];
    for (let i = 0; i < parsed.length; i++) {
        for (let j = 0; j < parsed[i].length; j++) {
            if (!isNaN(parsed[i][j]) || parsed[i][j] === '.') {
                continue;
            } else {
                coordinates.push([i, j, parsed[i][j]]);
            }
        }
    }
    return coordinates;
}

// write a function to get all numeric digits that are adjacent to a symbol
// include diagonals
// use an offset list to check all adjacent cells
// if the cell is a number, add it to a list
// return the list
function getAdjacentDigits(coordinates, parsed) {
    const adjacentDigits = [];
    const offsets = [[-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]];
    for (let coordinate of coordinates) {
        const [row, col, symbol] = coordinate;
        for (let offset of offsets) {
            const [rowOffset, colOffset] = offset;
            const newRow = row + rowOffset;
            const newCol = col + colOffset;
            if (newRow < 0 || newRow >= parsed.length || newCol < 0 || newCol >= parsed[0].length) {
                continue;
            } else if (!isNaN(parsed[newRow][newCol])) {
                adjacentDigits.push([newRow, newCol]);
            }
        }
    }
    return adjacentDigits;
}

// now using getAdjacentDigits as a helper, set these indexes to a period
// in the parsed array
function process(parsed) {

    const symbolCoordinates = getSymbolCoordinates(parsed);
    const adjacentDigits = getAdjacentDigits(symbolCoordinates, parsed);
    console.log(adjacentDigits)

    for (let index of adjacentDigits) {
        const [row, col] = index;
        parsed[row][col] = '.';
        searchExpand(parsed, row, col, 0);
        searchExpand(parsed, row, col, 1);
    }
}

// function will search left or right from current index
// if it's a number, then mark parsed also with a period at that index
// and continue in the same direction
function searchExpand(parsed, row, col, direction) {
    const offsets = [[0, 1], [0, -1]];

    const [rowOffset, colOffset] = offsets[direction];
    const newRow = row + rowOffset;
    const newCol = col + colOffset;
    if (newRow < 0 || newRow >= parsed.length || newCol < 0 || newCol >= parsed[0].length) {
        return;
    } else if (!isNaN(parsed[newRow][newCol])) {
        parsed[newRow][newCol] = '.';
        searchExpand(parsed, newRow, newCol, direction);
    }
}

// for (let row of parsed) {
//     console.log(row.join(""));
// }
// console.log("|---|")
process(parsed);
// for (let row of parsed) {
//     console.log(row.join(""));
// }

// write a function that will go through each row of parsed
// return contiguous list of numbers for each row
function getContiguousFromFullSchematic(parsed) {
    const contiguous = [];
    for (let row of parsed) {
        const l = getContiguousInRow(row);
        if (l.length > 0) contiguous.push(l);
    }
    return contiguous.flat();
}

function getContiguousInRow(row) {
    const contiguous = [];
    let i = 0;
    while (i < row.length) {
        if (isNaN(row[i])) {
            i++;
        } else {
            let j = i;
            while (!isNaN(row[j])) {
                j++;
            }
            contiguous.push(parseInt(row.slice(i, j).join('')));
            i = j;
        }
    }
    return contiguous;
}

const remainingNums = getContiguousFromFullSchematic(parsed);
const sumToSubtract = remainingNums.reduce((a, b) => a + b, 0);

const original = sampleInput.split('\n').map(row => row.split(''));

const total = original
    .map(row => getContiguousInRow(row))
    .filter(row => row.length > 0)
    .flat()
    .reduce((a, b) => a + b, 0);


console.log(`Answer part 1: ${total - sumToSubtract}, Sum to Subtract: ${sumToSubtract}, Total: ${total}`)

for (let row of original) {
    console.log(row.join(""));
}

// search for numbers that are adjacent to a symbol

function getIndexesForSymbol(data, symbol) {
    const indexes = [];
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === symbol) {
                indexes.push([i, j]);
            }
        }
    }
    return indexes;
}

const indices = getIndexesForSymbol(original, '*');
console.log(`indices for *: ${indices.join("|")}`)

// search for digits adjacent to coordinate
// if there is a digit, then expand either left or right
// in order to get the full number
// return the list of full numbers that are adjacent to the coordinate
function getAdjacentNumbers(data, coordinate) {
    const [row, col] = coordinate;
    const offsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    const adjacentNumbers = [];
    for (let offset of offsets) {
        const [rowOffset, colOffset] = offset;
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        if (newRow < 0 || newRow >= data.length || newCol < 0 || newCol >= data[0].length) {
            continue;
        } else if (!isNaN(data[newRow][newCol])) {
            adjacentNumbers.push([newRow, newCol]);
        }
    }
    return adjacentNumbers;
}

const adjacents = indices.map(
    index => [index, getAdjacentNumbers(original, index)]
    )

const gearRatios = adjacents.map(adj => {
    const [symbolCoordinate, adjacentNumbersCoordinates] = adj;
    
    const values = adjacentNumbersCoordinates.map( coordiante  => {
        return gridExpandSearch(original, coordiante[0], coordiante[1])
            .map(indices => {
                return original[indices[0]][indices[1]];
            })
            ;
    })
    .map(value => parseInt(value.join("")));

    const uniqueValues = Array.from(new Set(values));


    return {
        symbolCoordinate,
        adjacentNumbersCoordinates,
        uniqueValues
    }
}).filter(it =>  {
    return it.uniqueValues.length > 1;
}).map(it => {
    return {
        symbolCoordinate: it.symbolCoordinate,
        adjacentNumbersCoordinates: it.adjacentNumbersCoordinates,
        uniqueValues: it.uniqueValues,
        gearRatio: it.uniqueValues.reduce((a, b) => a * b, 1)
    }
});

console.log(`Answer part 2: ${gearRatios.map(it => it.gearRatio).reduce((a, b) => a + b, 0)}`);