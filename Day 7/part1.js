const fs = require('fs');

const readFile = (fileName) => {
    return fs.readFileSync(fileName, 'utf8');
};

const crabPositions = readFile('testinput.txt').split(',').map(Number);

let currentLowestScore = Number.MAX_SAFE_INTEGER;
let positionToMoveTo = crabPositions[0];

for(let i = 0; i < crabPositions.length; i++) {
    let position1 = crabPositions[i];
    let totalFuel = 0;
    for(let j = 0; j < crabPositions.length; j++) {
        let position2 = crabPositions[j];
        let fuelToBurn = Math.abs(position1 - position2);
        totalFuel += fuelToBurn;
    }
    if (totalFuel < currentLowestScore) {
        currentLowestScore = totalFuel;
        positionToMoveTo = position1;
    }
}

console.log('Position: ', positionToMoveTo, ' Lowest Fuel: ', currentLowestScore);