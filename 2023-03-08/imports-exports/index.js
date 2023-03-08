// import { vardas, suma } from './exports/variables.js';
import { sum } from './exports/functions.js';
import name, { vardas, pavarde, sum as sum3 } from './exports/variables.js';
import { vaisiai, automobiliai } from './exports/objects.js'

// console.log(vardas);

// console.log(suma);

console.log(name);
console.log(vardas);
console.log(pavarde);

console.log('Skaičių 10.2 ir 18.9 suma:', sum(12.2, 18.9));
console.log('Skaičių 10.2, 18.9 ir 22 irsuma:', sum3(12.2, 18.9, 22));

const { citrinos, vynuoges } = vaisiai;

console.log(citrinos);
console.log(vynuoges);

const [pirmas, antras, trecias] = automobiliai;

console.log(pirmas, antras);

// const audi = automobiliai[0];
// const bmw = automobiliai[1];

const [audi, bmw] = automobiliai;