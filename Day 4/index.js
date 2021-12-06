const fs = require("fs");

// 1. Read the file input.txt and print its content to the console.
// 2. Create a function that takes an array of numbers and returns a bingo card.
fs.readFile("input.txt", "utf8", (err, data) => {
  data = data.split("\n");
  // Extract the drawn numbers from the input file
  let drawnNumbers = data.shift().split(",");

  let cards = createBingoCards(data);
  let [winningCard, lastDrawnNumber] = findWinningBoard(cards, drawnNumbers);
  console.log(cards.findIndex((item) => item === winningCard));

  let sum = findSumOfCard(winningCard);
    console.log(lastDrawnNumber);
  console.log(sum * lastDrawnNumber);
});

const createBingoCards = (lines) => {
  let bingoCards = [];
  let card = [];
  lines.forEach((line) => {
    line = line.split(" ");
    line = line.filter((item) => item !== "");
    if (line.length === 0) {
      bingoCards.push(card);
      card = [];
    } else {
      card.push(line);
    }
  });
  return bingoCards;
};

const findWinningBoard = (cards, drawnNumbers) => {
  let winningCard = null;
  for (let drawnNumber of drawnNumbers) {
    for (let card of cards) {
      for (let line of card) {
        if (line.includes(drawnNumber)) {
          const numberIndex = line.findIndex((item) => item == drawnNumber);
          line[numberIndex] = "X";
        }
      }
      if (card.length > 0) {
        winningCard = checkVertically(card);
        winningCard = checkHorizontally(card);
        if (winningCard) {
          return [winningCard, drawnNumber];
        }
      }
    }
  }
};

const checkVertically = (card) => {
  for (let i = 0; i < 5; i++) {
    let count = 0;
    for (let j = 0; j < 5; j++) {
      if (card[j][i] == "X") {
        count++;
      } else {
        count = 0;
      }
      if (count == 5) {
        return card;
      }
    }
  }
};

const checkHorizontally = (card) => {
  for (let i = 0; i < 5; i++) {
    let count = 0;
    for (let j = 0; j < 5; j++) {
      if (card[i][j] == "X") {
        count++;
      } else {
        count = 0;
      }
      if (count == 5) {
        console.log(card);
        return card;
      }
    }
  }
};

const findSumOfCard = (card) => {
  let sum = 0;
  card.forEach((line) => {
    line.forEach((item) => {
        if (item != "X") {
            sum += parseInt(item);
        }
    });
  });
  return sum;
};
