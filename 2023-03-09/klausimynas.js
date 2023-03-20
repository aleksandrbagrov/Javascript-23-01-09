//CommonJs importavimo parrašymas į Modulio schemą
//const os = require('node:os');
//https://nodejs.org/dist/latest-v18.x/docs/api/os.html
//import os from 'node:os';

// console.log(os.totalmem());
// console.log(os.platform());
// console.log(os.homedir());
// console.log(os.freemem());
// console.log(os.cpus());
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
// const input = process.stdin;
// const output = process.stdout;

const rl = readline.createInterface({ input, output });

//Callback hell
// import readline from 'node:readline';
rl.question('Kiek jums yra metų?', metai => {
    rl.question('Koks Jūsų vardas?', vardas => {
        rl.question('Iš kokio Jūs miesto?', miestas => {
            rl.question('Šunys ar Katės?', gyvunas => {
                rl.question('Jūsų zodiakas?', zodiakas => {
                    console.log('Jūsų duomenys:');
                    console.log('Metai:', metai);
                    console.log('Vardas:', vardas);
                    console.log('Miestas:', miestas);
                    console.log('Gyvunas:', gyvunas);
                    console.log('Zodiakas:', zodiakas);
                
                    rl.close();
                });
            });
        });
    });
});

const metai     = await rl.question('Kiek jums yra metų?');
const vardas    = await rl.question('Koks Jūsų vardas?');
const miestas   = await rl.question('Iš kokio Jūs miesto?');
const gyvunas   = await rl.question('Šunys ar Katės?');
const zodiakas  = await rl.question('Jūsų zodiakas?');

console.log('Jūsų duomenys:');
console.log('Metai:', metai);
console.log('Vardas:', vardas);
console.log('Miestas:', miestas);
console.log('Gyvunas:', gyvunas);
console.log('Zodiakas:', zodiakas);

rl.close();


