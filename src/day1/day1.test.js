import { parseWrittenNumbers } from "./utils.js";
import { expect, it, describe } from 'vitest'


describe('parseWrittenNumbers', () => {

    it('parseWrittenNumbers correctly parses "111"', () => {
        const line = "111";
        const expected = [1, 1, 1];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
    
    it('parseWrittenNumbers correctly parses "one3four"', () => {
        const line = "one3four";
        const expected = [1, 3, 4];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
    
    it('parseWrittenNumbers correctly parses "two5six"', () => {
        const line = "two5six";
        const expected = [2, 5, 6];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
    
    it('parseWrittenNumbers correctly parses "three7eight"', () => {
        const line = "three7eight";
        const expected = [3, 7, 8];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
    
    it('parseWrittenNumbers correctly parses "nine0one"', () => {
        const line = "nine0one";
        const expected = [9, 0, 1];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
    
    it('parseWrittenNumbers correctly parses an empty string', () => {
        const line = "";
        const expected = [];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
    
    it('parseWrittenNumbers correctly parses a string with no numbers', () => {
        const line = "abc";
        const expected = [];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
    
    it('parseWrittenNumbers correctly parses a string with only words', () => {
        const line = "eightwothree";
        const expected = [8, 3];    
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });

    it('parseWrittenNumbers correctly parses a string with only words', () => {
        const line = "one1two2three";
        const expected = [1, 1, 2, 2, 3];
        const actual = parseWrittenNumbers(line);
        expect(actual).toEqual(expected);
    });
});


