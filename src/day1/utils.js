import fs from "fs";

export function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
export function parseFile(data) {
  return data.toString().split("\n").map((line) => {
    return parseNumbers(line);
  });
}
export function parseFile2(data) {
  return data.toString().split("\n").map((line) => {
    return parseWrittenNumbers(line);
  });
}
function parseNumbers(line) {
  return line.split("").map((number) => {
    return parseInt(number);
  }
  ).filter((potentialNumber) => {
    if (isNaN(potentialNumber)) {
      return false;
    }
    return true;
  });
}

export function sumNumbers(numbers) {
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];
  return firstNumber * 10 + lastNumber;
}

export function parseWrittenNumbers(line) {
  const writtenNumbers = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "zero": 0
  };

  const numbers = [];
  
  for (let i = 0; i < line.length; i++) {
    for (const key in writtenNumbers) {
      if (line.startsWith(key, i)) {
        numbers.push(writtenNumbers[key]);
        i += key.length - 1;
        break;
      } 
    }
    const character = line[i];
    if (!isNaN(parseInt(character))) {
      numbers.push(parseInt(character));
    }
  }

  return numbers;
}
