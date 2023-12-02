import { readFile, parseFile, sumNumbers, parseFile2 } from "./utils.js";

async function main() {
  const currentPath = process.cwd();
  const filePath = `${currentPath}/src/day1/input1.txt`;

  const fileContents = await readFile(filePath);
  //     const fileContents = `1abc2
  // pqr3stu8vwx
  // a1b2c3d4e5f
  // treb7uchet`;

  const parsed = parseFile(fileContents);
  console.log(parsed);
  const summed = parsed.map(sumNumbers);
  const total1 = summed.reduce((total, sum) => {
    return total + sum;
  }, 0);

  console.log(`Total 1: ${total1}`);

  let fileContents2 = `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`;

  const parsed2 = parseFile2(fileContents);
  const summed2 = parsed2.map(sumNumbers);
  console.log(parsed2);
  const total2 = summed2.reduce((total, sum) => {
    return total + sum;
  }, 0);
  console.log(`Total 2: ${total2}`);
}

main();