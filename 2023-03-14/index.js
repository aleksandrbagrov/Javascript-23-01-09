import { faker } from '@faker-js/faker';
import fs from 'node:fs/promises';
import readline from 'node:readline/promises';
import chalk from 'chalk'

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const login = await rl.question('Įveskite prisijungimo vardą:\n');
const password = await rl.question('Įveskite slaptažodį:\n');

if(login === 'admin' && password === '1234') {

    const vardas = faker.name.firstName();
    const pavarde = faker.name.lastName();
    const slaptazodis = faker.internet.password();
    const elpastas = faker.internet.email(vardas, pavarde);
    const gimtadienis = faker.date.birthdate();

    //console.log(vardas, pavarde, slaptazodis, elpastas, gimtadienis);

    const bday = new Date(gimtadienis);

    const rezultatas = `${vardas}\t${pavarde}\t${slaptazodis}\t${elpastas}\t${bday.toLocaleDateString('lt-LT')}\n`; 

    await fs.appendFile('./people.txt', rezultatas);

    console.log(chalk.bgGreen.white('Duomenys sėkmingai išsaugoti'));

} else {
    console.log(chalk.bgRed.white('Neteisingi prisijungimo duomenys'));
}

rl.close();

//console.log(bday.toLocaleString('lt-LT')); // Norint susigrąžinti datą ir laiką
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
//console.log(bday.toLocaleDateString('lt-LT')); //Norint susigrąžinti tiesiog datą
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
//console.log(bday.toLocaleTimeString('lt-LT')); // Norint susigrąžinti tiesiog laiką