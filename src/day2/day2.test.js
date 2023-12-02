import { Solution } from './day2';
import { expect, it, describe } from 'vitest';

describe('parseLine', () => {
    it('correctly parses a line', () => {
        const line = "Game 1: 2 red";
        const expected = {
            gameId: 1,
            pulls: [
                {
                    red: 2
                }
            ]
        };

        const result = Solution.parseLine(line);

        expect(result).toEqual(expected);
    });

    it('correctly parses a line', () => {
        const line = "Game 1: 2 red; 3 blue; 1 green";
        const expected = {
            gameId: 1,
            pulls: [
                { red: 2 },
                { blue: 3 },
                { green: 1 }
            ]
        };

        const result = Solution.parseLine(line);

        expect(result).toEqual(expected);
    });

    it('part 2', () => {
        const line = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
        const expected = {
            gameId: 1,
            pulls: [
                { blue: 3, red: 4 },
                { red: 1, green: 2, blue: 6 },
                { green: 2 }
            ]
        };

        const result = Solution.parseLine(line);

        expect(result).toEqual(expected);
    })
});


describe('isGamePossible', () => {
    it('returns true when all pulls are within the constraint', () => {
        const pullList = [
            { red: 10, green: 12, blue: 14 },
            { red: 5, green: 8, blue: 10 },
            { red: 2, green: 3, blue: 4 }
        ];

        const result = Solution.isGamePossible(pullList);

        expect(result).toBe(true);
    });

    it('returns false when at least one pull exceeds the constraint', () => {
        const pullList = [
            { red: 10, green: 12, blue: 14 },
            { red: 5, green: 8, blue: 10 },
            { red: 15, green: 3, blue: 4 }
        ];

        const result = Solution.isGamePossible(pullList);

        expect(result).toBe(false);
    });

    it('returns true when the pull list is empty', () => {
        const pullList = [];

        const result = Solution.isGamePossible(pullList);

        expect(result).toBe(true);
    });
});


describe('computeSamplePart1', () => {
    it('returns the sum of gameIds for possible games', () => {
        const sampleInput = `Game 1: 2 red; 3 blue; 1 green
            Game 2: 3 blue; 1 red; 2 green
            Game 3: 1 green; 2 red; 3 blue`;

        const solution = new Solution();
        solution.provider.setSampleDataPart1(sampleInput);
        const result = solution.computeSamplePart1();

        expect(result).toBe(6);
    });

    it('returns 0 when no games are possible', () => {
        const sampleInput = `Game 1: 5 red; 3 blue; 1 green
            Game 2: 3 blue; 1 red; 2 green
            Game 3: 2 green; 2 red; 15 blue`;

        const solution = new Solution();
        solution.provider.setSampleDataPart1(sampleInput)
        const result = solution.computeSamplePart1(sampleInput);

        expect(result).toBe(3);
    });
});

describe('isGamePossible', () => {
    it('returns true when all pulls are within the constraint', () => {
        const pullList = [
            { red: 10, green: 12, blue: 14 },
            { red: 5, green: 8, blue: 10 },
            { red: 2, green: 3, blue: 4 }
        ];

        const result = Solution.isGamePossible(pullList);

        expect(result).toBe(true);
    });

    it('returns false when at least one pull exceeds the constraint', () => {
        const pullList = [
            { red: 10, green: 12, blue: 14 },
            { red: 5, green: 8, blue: 10 },
            { red: 15, green: 3, blue: 4 }
        ];

        const result = Solution.isGamePossible(pullList);

        expect(result).toBe(false);
    });

    it('returns true when the pull list is empty', () => {
        const pullList = [];

        const result = Solution.isGamePossible(pullList);

        expect(result).toBe(true);
    });

    it('returns true when using a custom constraint', () => {
        const pullList = [
            { red: 10, green: 12, blue: 14 },
            { red: 5, green: 8, blue: 10 },
            { red: 2, green: 3, blue: 4 }
        ];
        const constraint = { red: 10, green: 12, blue: 14 };

        const result = Solution.isGamePossible(pullList, constraint);

        expect(result).toBe(true);
    });

    it('returns false when using a custom constraint and at least one pull exceeds the constraint', () => {
        const pullList = [
            { red: 10, green: 12, blue: 14 },
            { red: 5, green: 8, blue: 10 },
            { red: 15, green: 3, blue: 4 }
        ];
        const constraint = { red: 10, green: 10, blue: 10 };

        const result = Solution.isGamePossible(pullList, constraint);

        expect(result).toBe(false);
    });
});

describe.only('overall runner', () => {

    it('returns the correct result for part 1', () => {
        const solution = new Solution();
        const currentPath = process.cwd();
        const filePath = `${currentPath}/src/day2/day2.part1.txt`;
        solution.provider.setFilePathPart1(filePath);
        const result = solution.computePart1();
        console.log(result)
        expect(result).toBe(2256);
    }
    );
});