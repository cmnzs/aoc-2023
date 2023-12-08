import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'day6.txt');

const fileInput = fs.readFileSync(filePath, 'utf8');


const sampleInput = `Time:      7  15   30
Distance:  9  40  200`;

// const [timeLine, distanceLine] = sampleInput.split('\n');
const [timeLine, distanceLine] = fileInput.split('\n');


const times = timeLine.split(':')[1].trim().split(/ +/).map(Number);
const distances = distanceLine.split(':')[1].trim().split(/ +/).map(Number);

// merge the two arrays, keying off time, with value as distance
const map = times.reduce((acc, time, index) => {
    acc.set(time, distances[index]);
    return acc;
}, new Map);


function getWaysToBeatDistance(time, distanceRecord) {
    return generateCombinations(time)
    .filter(([timePressed, timeRemaining]) => {
        const distance = distanceTravelled(timePressed, timeRemaining);
        return distance > distanceRecord;
    });
}
function getWays2(time, distanceRecord) {
    let counter = 0;
    for (let i = 0; i < time; i++) {
        const timePressed = i;
        const timeRemaining = time - i;
        const distance = distanceTravelled(timePressed, timeRemaining);
        if (distance > distanceRecord) {
            counter++;
        }
    }
    return counter;
}

function distanceTravelled(timePressed, timeRemaining) {
    return timePressed * timeRemaining;
}

function generateCombinations(time) {
    const combos = [];
    for (let i = 0; i < time; i++) {
        const timePressed = i;
        const timeRemaining = time - i;
        combos.push([timePressed, timeRemaining]);
    }
    return combos;
}

const f = Array.from(map).reduce((acc, [time, distance]) => {
    const waysToBeatDistance = getWays2(time, distance);
    console.log(`waysToBeatDistance for ${time}: ${waysToBeatDistance}`);
    return acc * waysToBeatDistance;
}, 1);

console.log(`part 1: ${f}`);

const time2 = timeLine
    .split(':')[1]
    .trim()
    .replace(/ +/g, '')

const distance2 = distanceLine
    .split(':')[1]
    .trim()
    .replace(/ +/g, '')

console.log(`time2: ${time2}, distance2: ${distance2}`);

const ways2 = getWays2(time2, distance2);

console.log(`ways2: ${ways2}`);