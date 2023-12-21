import { generateHands } from './utils.js';
import { expect, it, describe } from 'vitest';

describe('generateHands', () => {
    it.only('should generate all possible hands with 1 card', () => {
        const partialHand = ['A', 'K', 'Q', 'T'];
        const expected = [
            ['A', 'K', 'Q', 'T', '9'],
            ['A', 'K', 'Q', 'T', '8'],
            ['A', 'K', 'Q', 'T', '7'],
            // ... more combinations ...
            ['A', 'K', 'Q', 'T', '2']
        ];
        const actual = generateHands(partialHand);
        expect(actual).toEqual(expected);
    });
});