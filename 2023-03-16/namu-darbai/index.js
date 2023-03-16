import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';

const app = express();

// Kelio (route'o) aprašymas
app.get('/', (uzklausa, atsakymas) => {
    atsakymas.send('<h1>Serveris veikia</h1>');
});

app.get('/titulinis', (uzklausa, atsakymas) => {
    //path.resolve konvertuoja realityvu kelią į absoliutų
    atsakymas.sendFile(path.resolve('./templates/home.html'));
});

app.get('/kontaktai', async (uzklausa, atsakymas) => {
    if(JSON.stringify(uzklausa.query) === '{}')
        return atsakymas.sendFile(path.resolve('./templates/contact-us.html'));

    try {
        let database = await fs.readFile('./database.json', 'utf-8');
        database = JSON.parse(database);
        database.push(uzklausa.query);
        await fs.writeFile('./database.json', JSON.stringify(database));
    } catch {
        await fs.writeFile('./database.json', JSON.stringify([uzklausa.query]));
    }

    atsakymas.redirect('/titulinis');
});

app.listen(3000);