const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    data = data.split('\n');
    let total = 0;
    let prev = 0;
    for (let i = 0; i < data.length; i++) {
        let num = Number(data[i]);
        if (num > prev && i > 0) {
            total++;
        }
        prev = num;
    }
    console.log(total);
});


fs.readFile('input.txt', 'utf8', (err, data) => {
    let testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    data = data.split('\n');
    let total = 0;
    let prev = 0;
    
    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        for (let j = i; j < i+3; j++) {
            let num = Number(data[j]);
            sum += num;
        }
        if (sum > prev && i > 0) {
            total++;
        }
        console.log(prev, sum);
        prev = sum;
    }
    console.log('second:', total);
});