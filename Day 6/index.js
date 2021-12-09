const fs = require("fs");
/**
 * Life of a Lanternfish:
 * After one day, its internal timer would become 2.
 * After another day, its internal timer would become 1.
 * After another day, its internal timer would become 0.
 * After another day, its internal timer would reset to 6, and it would create a new lanternfish with an internal timer of 8.
 * After another day, the first lanternfish would have an internal timer of 5, and the second lanternfish would have an internal timer of 7.
 */
const readInput = (filename) => {
  return fs.readFileSync(filename, "utf8").split("\n");
};

const data = readInput("input.txt")[0].split(',').map(Number).sort((a, b) => a - b);

const lanternFish = new Map();

for(let i = 0; i < 9; i++) {
    lanternFish.set(i, 0);
};


data.forEach((value) => {
    if(!lanternFish.has(value)) {
        lanternFish.set(value, 1);
    } else {
        lanternFish.set(value, lanternFish.get(value) + 1);
    }
});


for(let i = 0; i < 256; i++){
    let nrOfNewFish = lanternFish.get(0);
    for(let j = 0; j < lanternFish.size; j++) {
        lanternFish.set(j, lanternFish.get((j + 1)%9));
    }
    lanternFish.set(6, lanternFish.get(6) + nrOfNewFish);
    lanternFish.set(8, nrOfNewFish);
}

let finalFishCount = 0;
lanternFish.forEach((value, key, index) => {
    finalFishCount += value;
});

console.log(finalFishCount);