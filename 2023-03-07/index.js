//nodejs aplinkoje neegzistuoja: 
//document
//window 

// const vardas = 'Jonas';
// let pavarde = 'Jonaitis';

// for(let i = 0; i < 500; i++) {
//     console.log(`${vardas} ${pavarde}`);
// }

// setInterval(() => console.log('Sveiki visi'), 1000);

// console.log('pakeitimas');

//process.stdout.columns - grąžina maksimalų simbolių kiekį terminalo eilutėje
//process.stdout.rows - grąžina maksimalų eilučių kiekį terminale

import chalk from 'chalk';

console.log(chalk.green('Hello world!'));
console.log(chalk.red('Hello world!'));
console.log(chalk.bgWhite.blue('Hello world!'));