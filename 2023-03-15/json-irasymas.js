import fs from 'node:fs/promises';
import readline from 'node:readline/promises';

// const masyvas = [
//     'Radiatorius',
//     'Palangė',
//     'Spinta'
// ];

// await fs.writeFile('./database.json', JSON.stringify(masyvas));

// const database = await fs.readFile('./database.json', 'utf-8');

// console.log(JSON.parse(database));

/*
    Duomenų įrašymas pagal klausimus
*/

const rl = readline.createInterface(process.stdin, process.stdout);

const vardas = await rl.question('Įveskite savo vardą:\n');

try {
    //Norint JSON papildyti failą:
    //Pirmiausiai paimame senus duomenis
    let database = await fs.readFile('./database.json', 'utf-8');
    //Iššifruojame JSON stringą
    database = JSON.parse(database);
    //Papildome masyvą
    database.push(vardas);
    //Užšifruojame į JSON stringą ir patalpiname faile
    await fs.writeFile('./database.json', JSON.stringify(database));
} catch {
    //Jeigu failas nerastas jį sukuriame ir įrašome masyvą su pirmąją reikšme
    await fs.writeFile('./database.json', JSON.stringify([vardas]));
}

rl.close();