import { getWinningsForLines,classifyJokerHand, comparator2 } from "./day7.part2";
import { expect, it, describe, test } from 'vitest';
import { parseInput } from "./utils";


describe('classifyJokerHand', () => {
    test.each([

        // 5 jokers
        ['JJJJJ', 'five-of-a-kind'],

        // 4 jokers
        ['JJ1JJ', 'five-of-a-kind'],

        // 3 jokers - two cases
        ['JJJ11', 'five-of-a-kind'],
        ['JJJ12', 'four-of-a-kind'],

        // 2 jokers
        ['JJ123', 'three-of-a-kind'],
        ['JJ112', 'four-of-a-kind'],
        ['JJ111', 'five-of-a-kind'],

        // 1 joker
        ['J1234', 'one-pair'],
        ['JQA1A', 'three-of-a-kind'],

        ['JAAQQ', 'full-house'],
        ['JQAQA', 'full-house'],
        ['JAAAA', 'five-of-a-kind'],
        ['JJKKK', 'five-of-a-kind'],
        ['J2345', 'one-pair'],
        ['12345', 'high-card'],
        // no joker cases
        ['12345', 'high-card'],
        ['AAAA1', 'four-of-a-kind'],

        ['T55J5', 'four-of-a-kind'],
    ])('classifyJokerHand(%s) -> %s', (hand, expected) => {
        expect(classifyJokerHand(hand)).toBe(expected)
    })
});

describe('sortingJokerHands', () => {
    it('should sort a set of hands based on joker order', () => {

        const sampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
        const lines = parseInput(sampleInput).map(line => {
            return {
                ...line,
                handType: classifyJokerHand(line.hand)
            }
        });

        const copy = [...lines.map(x => x.hand)];

        const cardValuesOrder2 = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

        copy.sort((a, b) => comparator2(a, b, cardValuesOrder2));

        const expectedOrder = [
            { hand: '32T3K', }, // rank 1
            { hand: 'KK677', }, // rank 2
            { hand: 'T55J5', }, // rank 3
            { hand: 'QQQJA', }, // rank 4
            { hand: 'KTJJT', }  // rank 5
        ];

        expect(copy.map(x => x.join(""))).toEqual(expectedOrder.map(x => x.hand));
    });

});

describe('winnings calculation', () => {
    it('should calculate the winnings for a set of hands', () => {
        const sampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
        const lines = parseInput(sampleInput).map(line => {
            return {
                ...line,
                handType: classifyJokerHand(line.hand)
            }
        });
        const totalWinnings = getWinningsForLines(lines);
        const expectedWinnings = 5905;
        expect(totalWinnings).toEqual(expectedWinnings);
    });
});
