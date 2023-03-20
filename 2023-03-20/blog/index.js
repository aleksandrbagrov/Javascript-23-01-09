import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import { engine } from 'express-handlebars';

const app = express();

//Konfigūracinė eilutė kuri yra būtina norint POST metodu priimti duomenis
app.use(express.urlencoded({
    extended: true
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
    let data = await fs.readFile('./database.json', 'utf-8');
    data = JSON.parse(data);

    //Šablono iššaukimui naudojamas render() metodas
    res.render('home', { posts: data });
});

app.get('/new-entry', (req, res) => {
    res.render('new');
});

app.get('/single-post/:id', async (req, res) => {
    try{
        let database = await fs.readFile('./database.json', 'utf-8');
        database = JSON.parse(database);

        const post = database[req.params.id];

        res.render('single-post', { post });
    } catch {
        res.render('single-post', {
            message: 'Atsiprašome, tačiau įvyko klaida'
        });
    }
});

//Norint priimti duomenis POST metodu, kreipiamės į .post() funkciją
app.post('/save-post', async (req, res) => {
    try {
        let database = await fs.readFile('./database.json', 'utf-8');
        database = JSON.parse(database);
        database.push(req.body);
        await fs.writeFile('./database.json', JSON.stringify(database));
    } catch {
        await fs.writeFile('./database.json', JSON.stringify([req.body]));
    }

    res.redirect('/');
});



app.listen(3000);