//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html

import fs from 'node:fs/promises';

//Norint sukurti direktoriją
//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fspromisesmkdirpath-options
//await fs.mkdir('direktorijos_pavadinimas');

//Norint sukurti kelias direktorijas iš karto
//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fspromisesmkdirpath-options
//await fs.mkdir('test/pirmas/test', { recursive: true });

//Norint sukurti failą ir jame įrašyti turinį
//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fspromiseswritefilefile-data-options
// await fs.writeFile('hello.txt', 'Viso gero');
// \n - New line (Nauja eilutė);
// \t - Tab (Tabuliatorius);

// Norint papildyti failą
//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#filehandleappendfiledata-options
//await fs.appendFile('hello.txt', 'Lorem\tipsum    Hello World\n');


//Patikrinimui ar failas arba direktorija yra sukurta
//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fspromisesaccesspath-mode
// try {
//     const resp = await fs.access('hello.txt');

//     console.log('Failas egzistuoja');
// } catch {
//     console.log('Failo nėra');
// }

//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fspromisesrmdirpath-options
//Norint ištrinti direktoriją
//fs.rmdir('test');