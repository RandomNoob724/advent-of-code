const fs = require("fs");

const readInput = (fileName) => {
  return fs.readFileSync(fileName, "utf8");
};

const data = readInput("input.txt").split("\n");

const newData = [];

data.forEach((line) => {
  line = line.split("->");
  newData.push(line);
});

const findMaxY = (data) => {
  let maxY = 0;
  let maxX = 0;
  data.forEach((line) => {
    line.forEach((point) => {
      const [x, y] = point.split(",");
      if (y > maxY) {
        maxY = y;
      }
      if (x > maxX) {
        maxX = x;
      }
    });
  });
  return [parseInt(maxX), parseInt(maxY)];
};

const buildGrid = (data) => {
  const [maxX, maxY] = findMaxY(data);
  const grid = [];
  for (let i = 0; i <= maxY; i++) {
    const line = [];
    for (let j = 0; j <= maxX; j++) {
      line.push(".");
    }
    grid.push(line);
  }
  return grid;
};

let grid = buildGrid(newData);

newData.forEach((line, index) => {
  let [point1, point2] = line;
  let [x1, y1] = point1.split(",").map((x) => parseInt(x));
  let [x2, y2] = point2.split(",").map((x) => parseInt(x));
  let degree = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  console.log("X1, Y1", x1, y1);
  console.log("X2, Y2", x2, y2);
  console.log(degree);

  // Check if the angle is 45, 90, 135, 180, 225, 270, 315

  if (degree == 45) {
    for (let i = y1; i <= y2; i++) {
      if (grid[i][x1] == ".") {
        grid[i][x1] = 1;
      } else {
        grid[i][x1] += 1;
      }
      x1++;
    }
  } else if (degree == 135) {
    for (let i = y1; i <= y2; i++) {
      if (grid[i][x1] == ".") {
        grid[i][x1] = 1;
      } else {
        grid[i][x1] += 1;
      }
      x1--;
    }
  } else if (degree == -45){
    for (let i = y1; i >= y2; i--) {
      if (grid[i][x1] == ".") {
        grid[i][x1] = 1;
      } else {
        grid[i][x1] += 1;
      }
      x1++;
    }
  } else if (degree == -135){
    for (let i = y1; i >= y2; i--) {
      if (grid[i][x1] == ".") {
        grid[i][x1] = 1;
      } else {
        grid[i][x1] += 1;
      }
      x1--;
    }
  }

  if (y1 === y2) {
    let start = x1 > x2 ? x2 : x1;
    let limit = x1 > x2 ? x1 : x2;
    for (let i = start; i <= limit; i++) {
      if (grid[y1][i] == ".") {
        grid[y1][i] = 1;
      } else {
        grid[y1][i] += 1;
      }
    }
  } else if (x1 === x2) {
    let start = y1 > y2 ? y2 : y1;
    let limit = y1 > y2 ? y1 : y2;
    for (let i = start; i <= limit; i++) {
      if (grid[i][x1] == ".") {
        grid[i][x1] = 1;
      } else {
        grid[i][x1] += 1;
      }
    }
  }
});

let dangerous = 0;
let output = "";
grid.forEach((line) => {
  console.log(line.join(""));
  line.forEach((point) => {
    if (point >= 2) {
      dangerous++;
    }
  });
  output += line.join("") + "\n";
});
fs.writeFileSync("grid.txt", output);
console.log(dangerous);
