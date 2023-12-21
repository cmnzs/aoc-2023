import fs from "fs";
import { getHandType, order, parseInput, generateCombinations } from "./utils.js";

Object.prototype.also = function(fn) {
    fn(this);
    return this;
}

String.prototype.itemCount = function() {
    const countMap = {};
    for (const char of this) {
        if (countMap[char]) {
            countMap[char]++;
        } else {
            countMap[char] = 1;
        }
    }
    return countMap;   
}

Array.prototype.itemCount = function() {
    const countMap = {};
    for (const item of this) {
        if (countMap[item]) {
            countMap[item]++;
        } else {
            countMap[item] = 1;
        }
    }
    return countMap;   
}

const sampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const fileInput = fs.readFileSync("src/day7/input.txt", "utf8");

const lines = parseInput(fileInput).map(line => {
        return {
            ...line,
            handType: classifyJokerHand(line.hand)
        }
    });

const itemsWithjokers = lines.filter(line => line.hand.indexOf('J') !== -1);

console.log(`itemsWithjokers: ${itemsWithjokers.length}`)
lines.forEach((x, i) => console.log(i, x.hand.join(''), x.handType));

// const lines = parseInput(sampleInput).map(line => {
//     return {
//         ...line,
//         handType: classifyJokerHand(line.hand)
//     }
// });

// console.log(lines)

const sorted = [...lines.map(x => x) ];

const cardValuesOrder2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

sorted.sort((a, b) => comparator2(a.hand, b.hand, cardValuesOrder2));

console.log(`sorted: ${sorted.length}`)
// console.log(sorted);

const totalWinnings = sorted.reduce((acc, line, index) => {
    return acc + (line.bid * (index + 1));
}, 0);

console.log(`total winnings: ${totalWinnings}`);

export function classifyJokerHand(hand) {
    const charMap = hand.itemCount();
    const jokerCount = charMap['J'] ? charMap['J'] : 0;
    const nonJokerEntries = Object.entries(charMap).filter(([key, value]) => key !== 'J');

    if (jokerCount === 5) {
        return 'five-of-a-kind';
    }

    if (jokerCount == 4) {
        return 'five-of-a-kind';
    }

    if (jokerCount == 3) {
        if (nonJokerEntries.length === 2) {
            return 'four-of-a-kind';
        }
        else {
            return 'five-of-a-kind';
        }
    }

    if (jokerCount == 2) {
        switch (nonJokerEntries.length) {
            case 3:
                // all are different, we can make 3 of a kind
                return 'three-of-a-kind';
            case 2:
                // there are 2 unique, so 
                // there is 1 card that has 2 copies, and 1 card that has 1
                // if we use both jokers to make the same card that has 2
                // then we have 4 of a kind
                return 'four-of-a-kind';
            case 1:
                // if there is only 1 unique card out of the three
                // then we can make a five-of-a-kind
                return 'five-of-a-kind';
            default:
                throw new Error(`unexpected nonJokerEntries.length: ${nonJokerEntries.length}`);
        }
    }

    if (jokerCount == 1) {
        // there will be 4 non-joker cards
        switch (nonJokerEntries.length) {
            case 4:
                // all are different, we can make 2 pair
                return 'one-pair';
            case 3:
                // there are 3 unique, so 
                // there is 1 card that has 2 copies, and 2 cards that have 1
                // if we use the joker to make the same card that has 2
                // then we have 3 of a kind
                return 'three-of-a-kind';
            case 2:

                // there are two cases here, one where the two unique cards
                // have a 3, 1 split
                // or they have a 2,2 split
                
                // if there are 2 unique cards out of the four
                // then we can make a full house
                // there are 2, 2 pairs. so we add to one,
                // then we have a triple and a double

                // if the split is 3,1 then we can make a four-of-a-kind

                if (nonJokerEntries[0][1] === 2 && nonJokerEntries[1][1] === 2) {
                
                    return 'full-house';
                } else {
                    return 'four-of-a-kind';
                }

            case 1:
                // if there is only 1 unique card out of the four
                // then we can make a five-of-a-kind
                return 'five-of-a-kind';
            default:
                throw new Error(`unexpected nonJokerEntries.length: ${nonJokerEntries.length}`);
        }
    }

    if (jokerCount == 0) {
        return getHandType(hand);
    }
}

export function comparator2(handA, handB, cardValuesOrder) {
    const handTypeA = classifyJokerHand(handA);
    const handTypeB = classifyJokerHand(handB);

    const indexA = order.indexOf(handTypeA);
    const indexB = order.indexOf(handTypeB);

    if (indexA < indexB) {
        return 1;
    } else if (indexA > indexB) {
        return -1;
    }

    if (indexA === indexB) {
        // console.log(`handTypeA: ${handTypeA} indexA: ${indexA} handTypeB: ${handTypeB} indexB: ${indexB}`);
        for (let i = 0; i < handA.length; i++) {
            const cardA = handA[i];
            const cardB = handB[i];
            const indexA = cardValuesOrder.indexOf(cardA);
            const indexB = cardValuesOrder.indexOf(cardB);
            // console.log(`cardA: ${cardA} indexA: ${indexA} cardB: ${cardB} indexB: ${indexB}`);
            if (indexA < indexB) {
                return 1;
            } else if (indexA > indexB) {
                return -1;
            }
        }
    }

    return 0;
}

export function getWinningsForLines(lines) {
    const copy = [...lines.map(x => x)];

    const cardValuesOrder2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

    copy.sort((a, b) => comparator2(a.hand, b.hand, cardValuesOrder2));

    const totalWinnings = copy.reduce((acc, line, index) => {
        return acc + (line.bid * (index + 1));
    }, 0);
    return totalWinnings;
}