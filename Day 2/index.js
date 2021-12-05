const fs = require('fs');

// Part 1
fs.readFile('./input.txt', 'utf8', (err, data) => {
    data = data.split('\n');
    let depth = 0;
    let horizontal = 0;
    for(let i = 0; i < data.length; i++) {
        const direction = data[i].split(' ')[0];
        const distance = parseInt(data[i].split(' ')[1]);

        if(direction == 'forward') {
            console.log(data[i]);
            horizontal += distance;
        } else if (direction == 'down') {
            depth += distance;
        } else if(direction == 'up') {
            depth -= distance;
        }
    }
    console.log(Math.abs(horizontal) * Math.abs(depth));
});

// Part 2 
fs.readFile('./input.txt', 'utf8', (err, data) => {
    data = data.split('\n');
    let depth = 0;
    let horizontal = 0;
    let aim = 0;
    for(let i = 0; i < data.length; i++) {
        const direction = data[i].split(' ')[0];
        const distance = parseInt(data[i].split(' ')[1]);

        if(direction == 'forward') {
            console.log(data[i]);
            horizontal += distance;
            depth += aim * distance;
        } else if (direction == 'down') {
            aim += distance;
        } else if(direction == 'up') {
            aim -= distance;
        }
    }
    console.log(Math.abs(horizontal) * Math.abs(depth));
});