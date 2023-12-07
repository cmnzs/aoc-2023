import fs from "fs";
import path from "path";

const fileInput = fs.readFileSync(path.join('./src/day5/day5.txt'), 'utf8');

const sampleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

// Each line within a map contains three numbers: the destination range start, the source range start, and the range length.

/**
 * Represents a structured specification.
 * @typedef {Object} StructuredSpec
 * @property {number} destStart - The starting position in the destination array.
 * @property {number} sourceStart - The starting position in the source array.
 * @property {number} rangeLength - The length of the range.
 */

/**
 * Maps a value based on a string specification.
 *
 * @param {string[]} stringSpecification - The string specification used for mapping.
 * @returns {Function} - A function that maps a value based on the string specification.
 */
function rangeMapper(stringSpecification) {

    const structuredSpec = stringSpecification
        .map(line => line.split(" ").map(Number))
        .map(([destStart, sourceStart, rangeLength]) => ({ destStart, sourceStart, rangeLength }));

    return (value) => {
        const mappedRange = structuredSpec.find(({ destStart, sourceStart, rangeLength }) => {
            return value >= sourceStart && value < (sourceStart + rangeLength);
        });

        if (mappedRange === undefined) {
            // console.log(`No range found for ${value}`);
            return value;
        }
        const mappedValue = mappedRange.destStart + (value - mappedRange.sourceStart);
        return mappedValue;
    }
}

function splitInput(input) {
    const lines = input.split("\n");
    const seedsLine = lines.shift();
    const seeds = seedsLine
        .split(":").map(x => x.trim())[1]
        .split(" ")
        .map(Number);

    let lastKey = null;

    const sections = lines.reduce((acc, line) => {
        if (line.includes(":")) {
            const key = line.split(":").map(x => x.trim())[0].split(" ")[0];
            acc[key] = [];
            lastKey = key;
        } else if (line.trim() !== "") {
            if (lastKey !== null) {
                acc[lastKey].push(line.trim());
            }
        }
        return acc;
    }, {});

    return {
        seeds,
        sections
    };
}

// const { seeds, sections } = splitInput(sampleInput);
const {seeds, sections} = splitInput(fileInput);
console.log(seeds);
Object.entries(sections).forEach(line => console.log(line));

const seedToSoil = rangeMapper(sections["seed-to-soil"]);
const soilToFertilizer = rangeMapper(sections["soil-to-fertilizer"]);
const fertilizerToWater = rangeMapper(sections["fertilizer-to-water"]);
const waterToLight = rangeMapper(sections["water-to-light"]);
const lightToTemperature = rangeMapper(sections["light-to-temperature"]);
const temperatureToHumidity = rangeMapper(sections["temperature-to-humidity"]);
const humidityToLocation = rangeMapper(sections["humidity-to-location"]);

const locations = [];
for (let seed of seeds) {
    const soil = seedToSoil(seed);
    const fertilizer = soilToFertilizer(soil);
    const water = fertilizerToWater(fertilizer);
    const light = waterToLight(water);
    const temperature = lightToTemperature(light);
    const humidity = temperatureToHumidity(temperature);
    const location = humidityToLocation(humidity);
    locations.push(location);
    // console.log(`Seed ${seed} maps to location ${location}`);
}
console.log(`the minimum location is ${Math.min(...locations)}`);

const seedPairs = seeds.reduce((acc, seed) => {
    if (acc.length === 0) {
        acc.push([seed]);
        return acc;
    }
    const last = acc[acc.length - 1];

    if (last.length === 1) {
        last.push(seed);
    } else {
        acc.push([seed]);
    }
    return acc;
}, []);

console.log(seedPairs);
let minLocation = Infinity;

for (let [start, length] of seedPairs) {
    for (let i = start; i < start + length; i++) {
        const soil = seedToSoil(i);
        const fertilizer = soilToFertilizer(soil);
        const water = fertilizerToWater(fertilizer);
        const light = waterToLight(water);
        const temperature = lightToTemperature(light);
        const humidity = temperatureToHumidity(temperature);
        const location = humidityToLocation(humidity);
        if (location < minLocation) {
            minLocation = location;
        }
        // console.log(`Seed ${i} maps to location ${location}`);
    }
}
console.log(`the minimum location is ${minLocation}`);
