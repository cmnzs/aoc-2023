import { comparator } from './utils.js';
import { expect, it, describe } from 'vitest';

describe('comparator', () => {
    it('should correctly sort hands in descending order', () => {
        const hands = ['32T3K', 'T55J5', 'KK677', 'KTJJT', 'QQQJA'];
        const expected = ['32T3K', 'KTJJT', 'KK677', 'T55J5', 'QQQJA'];
        const actual = hands.sort(comparator);
        expect(actual).toEqual(expected);
    });

    it('minimal 2', () => {
        const hands = ['QQQJA', 'T55J5'];
        const expected = ['T55J5', 'QQQJA'];
        const actual = hands.sort(comparator);
        expect(actual).toEqual(expected);
    });
    
    it('minimal', () => {
        const hands = ['KK677', 'KTJJT'];
        const expected = ['KTJJT', 'KK677'];
        hands.sort(comparator);
        expect(hands).toEqual(expected);
    });
});