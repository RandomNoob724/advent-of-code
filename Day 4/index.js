const fs = require('fs');


// 1. Read the file input.txt and print its content to the console.
// 2. Create a function that takes an array of numbers and returns a bingo card.
fs.readFile('input.txt', 'utf8', (err, data) => {
    data = data.split('\n');
    // Extract the drawn numbers from the input file
    let drawnNumbers = data.shift().split(',');

    let cards = createBingoCards(data);
});

const createBingoCards = (lines) => {
    let bingoCards = [];
    let card = [];
    lines.forEach((line) => {
        line = line.split(' ');
        line = line.filter(item => item !== '');
        if(line.length === 0){
            bingoCards.push(card);
            card = [];
        } else {
            card.push(line);
        }
    });
    return bingoCards;
};