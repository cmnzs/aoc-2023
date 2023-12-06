import fs from 'fs';
import path from 'path';

const sampleInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const fileInput = fs.readFileSync(path.join('./src/day4/day4.txt'), 'utf8');

const parsed = fileInput
// const parsed = sampleInput
    .split('\n')
    .map(row => row.split(':'))
    .map(row => {
        const [card, numbers] = row;
        const [cardName, cardNumber] = card.split(' ');
        const numbersList = numbers
            .split('|');           
        
        const winningNumbers = numbersList[0];
        const yourNumbers = numbersList[1];

        function parseNums(x) {
            return x.trim().split(/ +/)
            .map(it => parseInt(it.trim()))}
        ;

        return {
            cardNumber,
            winningNumbers: parseNums(winningNumbers),
            yourNumbers: parseNums(yourNumbers)
        }
    });

function score(winningNumbers, yourNumbers) {
    const winningSet = new Set(winningNumbers);
    const yourSet = new Set(yourNumbers);
    const intersection = new Set([...winningSet].filter(x => yourSet.has(x)));
    if (intersection.size === 0) return 0;
    return Math.pow(2, intersection.size - 1);
}

parsed.forEach(item => console.log(item));

const score1 = parsed.reduce((acc, item) => {
    const scoreForItem = score(item.winningNumbers, item.yourNumbers);
    console.log(`Card ${item.cardNumber} score: ${scoreForItem}`);
    return acc + scoreForItem;
}, 0);

console.log(`Score 1: ${score1}`);

const cardsWithMatches = parsed.map(item => {
    const winningSet = new Set(item.winningNumbers);
    const yourSet = new Set(item.yourNumbers);
    const numMatches = new Set([...winningSet].filter(x => yourSet.has(x))).size;

    return {
        ...item,
        numMatches
    };
});

function buildNewCardList(cardsWithMatches) {
    
    const withIndex = cardsWithMatches.map((item, index) => {
        return {
            ...item,
            index
        }
    });

    const queue = withIndex.map(item => item);

    const newCards = [];
    let iterations = 0;

    while(queue.length > 0) {
        
        iterations++;

        const it = queue.shift();
        newCards.push(it);
        const {index, numMatches} = it;

        if (numMatches === 0) {
            console.log(`Iterations: ${iterations}`)
            continue
        } else {
            
            const toAdd = [];
            for (let i = 0; i < numMatches; i++) {
                toAdd.push(withIndex[index + i + 1]);
            }

            if (toAdd.length > 0){
                queue.push(...toAdd);
            }
        };   
    }
    return newCards;
}

function buildNewCardList2(cardsWithMatches) {

    const withIndex = cardsWithMatches.map((item, index) => {
        return {
            ...item,
            index
        }
    });

    const newCards = [];
    const queue = [...withIndex];

    while(queue.length > 0) {
        const card = queue.shift();
        newCards.push(card);

        console.log(`queue size: ${queue.length}`);
        
        if (card.numMatches > 0) {
            const nextCards = withIndex.slice(card.index + 1, card.index + 1 + card.numMatches);
            queue.push(...nextCards);

            // console.log(`queue: ${queue.map(item => item.cardNumber)}`)
        }
    }

    return newCards;
}


console.log(buildNewCardList2(cardsWithMatches).length);