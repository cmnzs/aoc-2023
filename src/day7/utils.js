/**
 *
Hand: 32T3K Bid: 765 Type: one pair
Hand: KK677 Bid: 28 Type: two pairs
Hand: KTJJT Bid: 220 Type: two pairs
Hand: T55J5 Bid: 684 Type: three-of-a-kind
Hand: QQQJA Bid: 483 Type: three-of-a-kind
 */
export function comparator(handA, handB) {
    const handTypeA = getHandType(handA);
    const handTypeB = getHandType(handB);

    const order = [
        'five-of-a-kind',
        'four-of-a-kind',
        'full house',
        'three-of-a-kind',
        'two pairs',
        'one pair',
        'high-card'
    ];

    const indexA = order.indexOf(handTypeA);
    const indexB = order.indexOf(handTypeB);

    if (indexA < indexB) {
        return 1;
    } else if (indexA > indexB) {
        return -1;
    }

    if (indexA === indexB) {
        console.log(`handTypeA: ${handTypeA} indexA: ${indexA} handTypeB: ${handTypeB} indexB: ${indexB}`);
        const cardValuesOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

        for (let i = 0; i < handA.length; i++) {
            const cardA = handA[i];
            const cardB = handB[i];
            const indexA = cardValuesOrder.indexOf(cardA);
            const indexB = cardValuesOrder.indexOf(cardB);
            console.log(`cardA: ${cardA} indexA: ${indexA} cardB: ${cardB} indexB: ${indexB}`);
            if (indexA < indexB) {
                return 1;
            } else if (indexA > indexB) {
                return -1;
            }
        }
    }

    return 0;
}

// possible cards
// A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2
export function parseInput(input) {
    const lines = input.split("\n");
    return lines.map(line => {
        let [hand, bid] = line.split(" ");
        hand = hand.split("");
        bid = parseInt(bid);
        return {
            hand,
            bid
        };
    });
}
/*
five-of-a-kind,
four-of-a-kind,
full house,
three-of-a-kind,
two pairs,
one pair,
or high card
 */
export function getHandType(hand) {
    const cardCounts = new Map();

    for (let card of hand) {
        if (cardCounts.has(card)) {
            cardCounts.set(card, cardCounts.get(card) + 1);
        } else {
            cardCounts.set(card, 1);
        }
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

export function printHand(line) {
    let { hand, bid, handType } = line;
    let color;

    switch (handType) {
        case "five-of-a-kind":
            color = colors.fgRed;
            break;
        case "four-of-a-kind":
            color = colors.fgGreen;
            break;
        case "full house":
            color = colors.fgBlue;
            break;
        case "three-of-a-kind":
            color = colors.fgYellow;
            break;
        case "two pairs":
            color = colors.fgMagenta;
            break;
        case "one pair":
            color = colors.fgCyan;
            break;
        default:
            color = colors.fgWhite;
            break;
    }

    console.log(
        "Hand:",
        color + colors.bright + line.hand.join("") + colors.reset,
        "Bid:",
        line.bid,
        "Type:",
        color + colors.bright + handType + colors.reset
    );
}

export const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
};
