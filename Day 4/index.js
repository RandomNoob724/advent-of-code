const fs = require("fs");

// 1. Read the file input.txt and print its content to the console.
// 2. Create a function that takes an array of numbers and returns a bingo card.
// fs.readFile("testinput.txt", "utf8", (err, data) => {
//   data = data.split("\n");
//   // Extract the drawn numbers from the input file
//   let drawnNumbers = data.shift().split(",");

//   let cards = createBingoCards(data);
//   let [winningCard, lastDrawnNumber] = findFirstWinningBoard(cards, drawnNumbers);
//   console.log(cards.findIndex((item) => item === winningCard));

//   let sum = findSumOfCard(winningCard);
//     console.log(lastDrawnNumber);
//   console.log(sum * lastDrawnNumber);
// });

// Part 2
fs.readFile("testinput.txt", "utf8", (err, data) => {
  data = data.split("\n");

  let drawnNumbers = data.shift().split(",");
  for (let number of drawnNumbers) {
    drawnNumbers[number] = parseInt(drawnNumbers[number]);
  }
  let cards = createBingoCards(data);
  cards.splice(0, 1);
  console.log(cards, drawnNumbers);
  let [winningCard, lastDrawnNumber] = findLastWinningBoard(
    cards,
    drawnNumbers
  );

  let sum = findSumOfCard(winningCard);
  console.log(sum);
  console.log(lastDrawnNumber, winningCard);
  console.log(sum * lastDrawnNumber);
  console.log(cards.findIndex((item) => item === winningCard));
});

const createBingoCards = (lines) => {
  let bingoCards = [];
  let card = [];
  lines.forEach((line) => {
    line = line.split(" ");
    line = line.filter((item) => item !== "");
    line = line.map((item) => parseInt(item));
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

const findFirstWinningBoard = (cards, drawnNumbers) => {
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

const findLastWinningBoard = (cards, drawnNumbers) => {
  for (let drawnNumber of drawnNumbers) {
    for (let card of cards) {
      for (let line of card) {
        for (let item of line) {
          if (item == drawnNumber) {
            line[line.indexOf(item)] = "X";
          }
        }
      }
      if (checkWinCondition(card) && cards.length > 1) {
        cards.splice(cards.indexOf(card), 1);
      } else if (checkWinCondition(card) && cards.length == 1) {
        return [card, drawnNumber];
      }
    }
  }
  return [cards[0], drawnNumbers[0]];
};

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
