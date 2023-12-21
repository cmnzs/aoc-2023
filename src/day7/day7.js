import fs from "fs";
import { parseInput, getHandType, comparator } from "./utils.js";
import { printHand } from "./utils.js";

const sampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const fileInput = fs.readFileSync("src/day7/input.txt", "utf8");

const lines = parseInput(sampleInput);
// const lines = parseInput(fileInput);

const linesWithType = lines.map(line => {
    const handType = getHandType(line.hand);
    return {
        ...line,
        handType
    };
});

const copy = [...linesWithType];
copy.sort((a, b) => {
    return comparator(a.hand, b.hand);
});

console.log("Original:");
linesWithType.forEach(printHand);
console.log("Sorted:");
copy.forEach(printHand);

const totalWinnings = copy.reduce((acc, line, index) => {
    return acc + (line.bid * (index + 1));
}, 0);
console.log(`total winnings: ${totalWinnings}`);


