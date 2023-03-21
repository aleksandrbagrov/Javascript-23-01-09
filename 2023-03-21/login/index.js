import express from 'express';
import fs from 'node:fs/promises';
import { engine } from 'express-handlebars';
import session from 'express-session';
import { auth } from './middleware/auth.js'

const app = express();
const file = './database.json';

// app.set('trust proxy', 1);

//Sesijos duomenų konfigūracija
app.use(session({
  secret: 'LABAI SLAPTA FRAZĖ',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

//Konfigūracinė eilutė kuri yra būtina norint POST metodu priimti duomenis
app.use(express.urlencoded({
    extended: true
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    let data = JSON.parse(await fs.readFile(file, 'utf-8'));

    data = data.filter(user => user.email === req.body.email && user.password === req.body.password);
    
    if(data.length > 0) {
        req.session.loggedIn = true;
        return res.redirect('/');
    }

    res.redirect('/login');
});

app.get('/', auth, (req, res) => {
    res.render('admin');
});

app.post('/', auth, async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile(file, 'utf-8'));
        data.push(req.body);
        await fs.writeFile(file, JSON.stringify(data));
    } catch {
        await fs.writeFile(file, JSON.stringify([req.body]));
    }

    res.redirect('/');
});

app.listen(3000);
