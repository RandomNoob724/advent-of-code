const fs = require("fs");

const testData = [
  '00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010',
  '01010',
];

// Part 1
// fs.readFile('./input.txt', 'utf8', (err, data) => {
//     data = data.split('\n');

//     let [nrOfZeros, nrOfOnes] = mostCommonInPosition(data);

//     let gamma = "";
//     let epsilon = "";

//     commonBitPerPosition.forEach((element, index) => {
//         if(element === '1') {
//             gamma += "1";
//             epsilon += "0";
//         } else {
//             gamma += "0";
//             epsilon += "1";
//         }
//     });

//     console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
// });

// Part 2
fs.readFile("./input.txt", "utf8", (err, data) => {
  data = data.split("\n");
//   data = testData;
  let oxygenData = oxygenGeneratorRating(data);
  let co2Data = co2GeneratorRating(data);

  console.log(oxygenData * co2Data);
});

const oxygenGeneratorRating = (data) => {
  let oxygenData = data;
  for (let i = 0; i < data[0].length; i++) {
    let [nrOfZeros, nrOfOnes] = mostCommonInPosition(oxygenData);
    let commonBitInPosition = "1";
    if (nrOfOnes[i] >= nrOfZeros[i]) {
      commonBitInPosition = "1";
    } else {
      commonBitInPosition = "0";
    }

    for (let j = 0; j < data.length; j++) {
      if (oxygenData.length === 1) {
        break;
      }
      oxygenData = oxygenData.filter(
        (element) => element[i] === commonBitInPosition
      );
    }
  }
  return parseInt(oxygenData[0], 2);
};

const co2GeneratorRating = (data) => {
  let co2Data = data;
  for (let i = 0; i < data[0].length; i++) {
    let [nrOfZeros, nrOfOnes] = mostCommonInPosition(co2Data);
    let uncommonBitInPosition = null;
    if (nrOfOnes[i] >= nrOfZeros[i]) {
      uncommonBitInPosition = "0";
    } else {
      uncommonBitInPosition = "1";
    }

    for (let j = 0; j < data.length; j++) {
      if (co2Data.length === 1) {
        break;
      }
      co2Data = co2Data.filter(
        (element) => element[i] === uncommonBitInPosition
      );
    }
  }

  return parseInt(co2Data[0], 2);
};

const mostCommonInPosition = (data) => {
  let nrOfZeros = [];
  let nrOfOnes = [];

  data.forEach((element) => {
    let newData = element.split("");
    newData.forEach((element, index) => {
      if (element === "0") {
        nrOfZeros[index] = nrOfZeros[index] ? nrOfZeros[index] + 1 : 1;
      } else {
        nrOfOnes[index] = nrOfOnes[index] ? nrOfOnes[index] + 1 : 1;
      }
    });
  });

  return [nrOfZeros, nrOfOnes];
};
