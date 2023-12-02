const fs = require('fs');
import { parse } from 'path';
import { DataProvider } from './utils.js';

export class Solution {
    constructor() {
        this.provider = new DataProvider();

        // this.provider.setSampleDataPart1(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        // Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        // Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);

        // this.provider.setFilePathPart1(`./day2.part1.txt`);
    }

    static parseLine(line) {
        const [gameChunk, pulls] = line.trim().split(': ');

        const pullList = pulls.split(';').map(pull => {
            const trimmed = pull.trim();
            const pullColors = trimmed.split(', ');
            const pullObjects = {};
            pullColors.forEach(pullColor => {
                const [count, color] = pullColor.split(' ');
                pullObjects[color] = parseInt(count);
            });
            return pullObjects;
        });

        const gameId = parseInt(gameChunk.trim().split(' ')[1]);

        return { gameId, pulls: pullList };
    }

    static isGamePossible(pullList, constraint = {red: 12, green: 13, blue: 14}) {
        
        for (const pull of pullList) {
            for (const color in pull) {
                if (pull[color] > constraint[color]) {
                    return false;
                }
            }
        }

        return true;
    }

    computeSamplePart1() {
        const lines = this.provider.getSamplePart1();
        
        const parsedLines = lines.map(line => Solution.parseLine(line));

        const possibleGames = parsedLines.filter(line => Solution.isGamePossible(line.pulls));
        
        const sumOfGameIds = possibleGames.reduce((sum, game) => sum + game.gameId, 0);

        return sumOfGameIds;
    }

    computePart1() {
        const lines = this.provider.getFilePart1();
        
        const parsedLines = lines.map(line => Solution.parseLine(line));

        const possibleGames = parsedLines.filter(line => Solution.isGamePossible(line.pulls));
        
        const sumOfGameIds = possibleGames.reduce((sum, game) => sum + game.gameId, 0);


        return sumOfGameIds;
    }

    computePart2(lines) {
        // Add your logic to compute Part 2 here
        // Return the computed value for Part 2
    }

    

}

 