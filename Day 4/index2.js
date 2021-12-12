const fs = require("fs");

const readFile = (fileName) => {
  const data = fs.readFileSync(fileName, "utf8");
  return data;
};

const newData = readFile("input.txt").split("\n");

let drawnNumbers = newData.shift().split(",").map(Number);

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

const createBingoCards = (lines) => {
  let bingoCards = [];
  let card = [];
  lines.forEach((line) => {
    line = line.split(" ");
    line = line.filter((item) => item !== "");
    line = line.map(Number);
    if (line.length === 0) {
      bingoCards.push(card);
      card = [];
    } else {
      card.push(line);
    }
  });
  bingoCards.push(card);
  return bingoCards;
};

const findLastWinningBoard = (cards, drawnNumbers) => {
  for (let drawnNumber of drawnNumbers) {
    for (let card of cards) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (card[i][j] == drawnNumber) {
            console.log(card[i][j]);
            card[i][j] = "X";
          }
        }
      }
    }
    for (let card of cards) {
      if (cards.length == 1) {
        return [card, drawnNumber];
      }
      if (checkWinCondition(card)) {
        cards.splice(cards.indexOf(card), 1);
      }
    }
  }
};

let cards = createBingoCards(newData);
cards.shift();

const checkWinCondition = (card) => {
  if (checkVertically(card)) {
    return checkVertically(card);
  } else if (checkHorizontally(card)) {
    return checkHorizontally(card);
  } else {
    return false;
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
        return card;
      }
    }
  }
};

let [winningCard, lastDrawnNumber] = findLastWinningBoard(cards, drawnNumbers);
console.log(winningCard);
let sum = findSumOfCard(winningCard);
console.log(sum);
console.log(lastDrawnNumber);
console.log(sum * lastDrawnNumber);
