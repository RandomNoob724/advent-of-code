const fs = require('fs');

const readFile = (fileName) => {
    return fs.readFileSync(fileName, 'utf8');
};

const crabPositions = readFile('input.txt').split(',').map(Number);



let currentLowestScore = Number.MAX_SAFE_INTEGER;
let positionToMoveTo = crabPositions[0];

for(let i = 0; i < Math.max(...crabPositions); i++) {
    let position1 = i;
    let totalFuel = 0;
    for(let j = 0; j < crabPositions.length; j++) {
        let position2 = crabPositions[j];
        let distanceToTravel = Math.abs(position1 - position2);
        for (let k = 1; k < distanceToTravel+1; k++) {
            totalFuel += k;
        }
    }
    console.log(totalFuel-1);
    if (totalFuel < currentLowestScore) {
        currentLowestScore = totalFuel;
        positionToMoveTo = position1;
    }
}

console.log('Position: ', positionToMoveTo, ' Lowest Fuel: ', currentLowestScore);