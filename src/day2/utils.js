import fs from 'fs';

export class DataProvider {
    constructor() {
        this.filePathPart1 = null;
        this.filePathPart2 = null;
        this.sampleDataPart1 = null;
        this.sampleDataPart2 = null;
    }

    setFilePathPart1(filePath) {
        this.filePathPart1 = filePath;
    }

    setFilePathPart2(filePath) {
        this.filePathPart2 = filePath;
    }

    setSampleDataPart1(sampleData) {
        this.sampleDataPart1 = sampleData;
    }

    setSampleDataPart2(sampleData) {
        this.sampleDataPart2 = sampleData;
    }

    getSamplePart1() {
        if (!this.sampleDataPart1) {
            throw new Error('Sample data for Part 1 is not configured.');
        }
        console.log(this.sampleDataPart1);
        return this.sampleDataPart1.split('\n');
    }

    getSamplePart2() {
        if (!this.sampleDataPart2) {
            throw new Error('Sample data for Part 2 is not configured.');
        }
        return this.sampleDataPart2.split('\n');
    }

    getFilePart1() {
        if (!this.filePathPart1) {
            throw new Error('File path for Part 1 is not configured.');
        }
        return this.loadFile(this.filePathPart1);
    }

    getFilePart2() {
        if (!this.filePathPart2) {
            throw new Error('File path for Part 2 is not configured.');
        }
        return this.loadFile(this.filePathPart2);
    }

    loadFile(filePath) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return fileContent.split('\n');
        } catch (error) {
            console.error('Error:', error);
        }
    }
}