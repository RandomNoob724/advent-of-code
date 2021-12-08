const fs = require('fs');

const readInput = (fileName) => {
    return fs.readFileSync(fileName, 'utf8');
};

const data = readInput('input.txt').split('\n');

const newData = [];

data.forEach(line => {
    line = line.split('->');
    newData.push(line);
});

console.log(newData);

const findMaxY = (data) => {
    let maxY = 0;
    let maxX = 0;
    data.forEach(line => {
        line.forEach(point => {
            const [x, y] = point.split(',');
            if(y > maxY) {
                maxY = y;
            }
            if(x > maxX) {
                maxX = x;
            }
        });
    });
    return [parseInt(maxX), parseInt(maxY)];
};

const buildGrid = (data) => {
    const [maxX, maxY] = findMaxY(data);
    const grid = [];
    for(let i = 0; i <= maxY; i++) {
        const line = [];
        for(let j = 0; j <= maxX; j++) {
            line.push('.');
        }
        grid.push(line);
    }
    return grid;
};

let grid = buildGrid(newData);


newData.forEach((line, index) => {
    console.log(line, index);
    let [point1, point2] = line;
    let [x1, y1] = point1.split(',').map(x => parseInt(x));
    let [x2, y2] = point2.split(',').map(x => parseInt(x));

    if(y1 === y2) {
        let start = x1 > x2 ? x2 : x1;
        let limit = x1 > x2 ? x1 : x2;
        for(let i = start; i <= limit; i++) {
            if(grid[y1][i] == '.') {
                grid[y1][i] = 1;
            } else {
                grid[y1][i] += 1;
            }
        }
    } else if(x1 === x2) {
        let start = y1 > y2 ? y2 : y1;
        let limit = y1 > y2 ? y1 : y2;
        for(let i = start; i <= limit; i++) {
            if(grid[i][x1] == '.') {
                grid[i][x1] = 1;
            } else {
                grid[i][x1] += 1;
            }
        }
    }
});

let dangerous = 0;
grid.forEach(line => {
    console.log(line.join(''));
    line.forEach(point => {
        if(point >= 12) {
            dangerous++;
        }
    });
    console.log(dangerous);
});

//console.log(findMaxY(newData));