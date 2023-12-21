import fs from "fs";

import { comparator, parseInput, generateCombinations, cardValuesOrder2 } from "./utils.js";


Object.prototype.also = function(fn) {
    fn(this);
    return this;
}

String.prototype.characterCountMap = function() {
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

const ALL_COMBOS = generateCombinations(cardValuesOrder2, 5)//.map(hand => hand.join(""));

console.log(`ALL_COMBOS: ${ALL_COMBOS.length}`);

const sampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

// const fileInput = fs.readFileSync("src/day7/input.txt", "utf8");

// const lines = parseInput(fileInput);
const lines = parseInput(sampleInput);

function processJokerHand(hand) {
    const cardToCountMap = new Map();

    for (let card of hand) {
        if (cardToCountMap.has(card)) {
            cardToCountMap.set(card, cardToCountMap.get(card) + 1);
        } else {
            cardToCountMap.set(card, 1);
        }
    }

    const counts = Array.from(cardToCountMap.values());

    const jokerCount = cardToCountMap.get("J");

    const copy = new Map(cardToCountMap);
    copy.delete("J");

    const keyValuePairs = Array.from(copy).map(([key, value]) => `${key}: ${value}`);

    const keys = Array.from(copy).map(([k, v]) => k);

    const potentialHand = getBestPossibleHandsFromCards(keys);
    console.log(`potentialHand: ${potentialHand}`)
    return `${jokerCount} joker | other cards: [${keyValuePairs.join(", ")}]`;
}

function getBestPossibleHandsFromCards(cards) {
    const hands = [];

    // cards contains a list of cards that are not jokers
    // ALL_COMBOS contains a list of all possible hands
    // we want to filter out all hands that are incompatible with the list in cards

    const possible_hands = ALL_COMBOS.filter(hand => {
        const handMap = hand.characterCountMap();
        const cardMap = hand.characterCountMap();        

    })

    console.log(` for card ${cards} possible_hands: ${possible_hands.length}, diff: ${ALL_COMBOS.length - possible_hands.length}`);
    const copy = [...possible_hands];

    copy.sort((a, b) => {
        return comparator(a, b);
    });

    return copy[copy.length - 1];
}

export function getHandType(hand) {
    const cardCounts = new Map();

    for (let card of hand) {
        if (cardCounts.has(card)) {
            cardCounts.set(card, cardCounts.get(card) + 1);
        } else {
            cardCounts.set(card, 1);
        }
    }

    // joker conditional
    if (cardCounts.has("J")) {
        return processJokerHand(hand);
    }

    const counts = Array.from(cardCounts.values());

    if (cardCounts.size === 1) {
        return "five-of-a-kind";
    }

    if (cardCounts.size === 2) {
        if (counts.includes(4) && counts.includes(1)) {
            return "four-of-a-kind";
        }

        if (counts.includes(3) && counts.includes(2)) {
            return "full house";
        }
    }

    if (cardCounts.size === 3) {
        if (counts.includes(3)) {
            return "three-of-a-kind";
        }

        if (counts.includes(2)) {
            return "two pairs";
        }
    }

    if (cardCounts.size === 4) {
        return "one pair";
    }

    return "high-card";
}


lines
    .map(line => { return { ...line, handType: getHandType(line.hand) } })
    .also(lines => lines.forEach(line => console.log(line)))