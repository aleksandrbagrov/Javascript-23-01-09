import chalk from 'chalk';

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeSpaces() {
    spaces = [];

    for(let i = 0; i < process.stdout.columns * 0.4; i++) {
        spaces.push(rand(0, process.stdout.columns - 1));
    }
}

const symbols = 'QWERTUOOPO{PKLAJSDASVXZC<MVSMUIUI@I#PPOIPO{PIOPU@#$^&IUI&**(&*$%@#^*(I((*';
let spaces = [];
let row = 0;

setInterval(() => {
    let rezultatas = '';

    if(!row)
        makeSpaces();

    for(let i = 0; i < process.stdout.columns; i++) {
        if(spaces.includes(i)) {
            rezultatas += ' ';
        } else {
            rezultatas += symbols[rand(0, symbols.length - 1)];
        }
    }

    console.log(chalk.hex('#00ff42').bgBlack(rezultatas));

    if(row > rand(2, 6)) 
        row = 0;
    else 
        row++;
}, 200);