const fs = require('fs');
const readline = require('readline');
const Word = require('./Word');

const fd = fs.createReadStream('./words_alpha.txt');
const rl = readline.createInterface({
    input: fd,
    crlfDelay: Infinity,
});

rl.on('line', line => {
});

rl.on('close', () => {

});

console.log(Word);
