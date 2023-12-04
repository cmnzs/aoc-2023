import { gridExpandSearch } from './gridExpandSearch.js';
import { expect, it, describe } from 'vitest'

describe('gridExpandSearch', () => {
    it('should expand search in the right direction', () => {
        const grid = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '1', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const row = 2;
        const col = 2;
        const resultCoordinates= gridExpandSearch(grid, row, col);
        expect(resultCoordinates).toEqual([[2, 2]]);
    });

    it('should expand search in the left direction', () => {
        const grid = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '1', '1', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const row = 2;
        const col = 2;
        const resultCoordinates= gridExpandSearch(grid, row, col);
        expect(resultCoordinates).toEqual([[2, 1], [2, 2]]);
    });

    it('should not expand search if the cell is not a number', () => {
        const grid = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', 'x', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const row = 2;
        const col = 2;
        const resultCoordinates= gridExpandSearch(grid, row, col);
        expect(resultCoordinates).toEqual([]);
    });

    it('should not expand search if the cell is already marked', () => {
        const grid = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', 1, 1, 1],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const row = 2;
        const col = 3;
        const resultCoordinates= gridExpandSearch(grid, row, col);
        expect(resultCoordinates).toEqual([[2, 2], [2, 3], [2,4]]);
    });

    it('should not expand search if the cell is out of bounds', () => {
        const grid = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', 1, '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const row = 0;
        const col = 2;
        const resultCoordinates= gridExpandSearch(grid, row, col);
        expect(resultCoordinates).toEqual([]);
    });
});