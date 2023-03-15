import express from 'express';
import path from 'node:path';

const app = express();

// Kelio (route'o) aprašymas
app.get('/', (uzklausa, atsakymas) => {
    atsakymas.send('<h1>Serveris veikia</h1>');
});

app.get('/titulinis', (uzklausa, atsakymas) => {
    //path.resolve konvertuoja realityvu kelią į absoliutų
    atsakymas.sendFile(path.resolve('./templates/home.html'));
});

app.get('/kontaktai', (uzklausa, atsakymas) => {
    console.log(uzklausa.query);
    atsakymas.sendFile(path.resolve('./templates/contact-us.html'));
});

app.listen(3000);