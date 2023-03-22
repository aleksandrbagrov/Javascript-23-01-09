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

//handlebars konfigūracija
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Prisijungimo forma
app.get('/login', (req, res) => {
    res.render('login');
});

//Prisijungimo duomenų tikrinimas
app.post('/login', async (req, res) => {
    let data = JSON.parse(await fs.readFile(file, 'utf-8'));

    data = data.filter(user => user.email === req.body.email && user.password === req.body.password);
    if(data.length > 0) {
        req.session.loggedIn = true;
        req.session.user = {
            name: data[0].name,
            last_name: data[0].last_name,
            email: data[0].email
        }
        return res.redirect('/');
    }

    res.redirect('/login');
});

//Visų vartotojų sąrašas
app.get('/', auth, async (req, res) => {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));

    res.render('admin', {
        user: req.session.user,
        data
    });
});

//Naujo vartotojo forma
app.get('/new-user', auth, (req, res) => {
    res.render('newuser', {
        user: req.session.user,
        message: req.session.message
    });

    delete req.session.message;
});

//Naujo varotojo išsaugojimas
app.post('/new-user', auth, async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile(file, 'utf-8'));
        
        if(data.find(user => user.email === req.body.email)) {
            req.session.message = 'Vartotojas tokiu el. pašto adresu jau registruotas';
            return res.redirect('/new-user');
        }

        data.push(req.body);
        await fs.writeFile(file, JSON.stringify(data));
    } catch {
        await fs.writeFile(file, JSON.stringify([req.body]));
    }

    res.redirect('/');
});

app.get('/delete-user/:id', async (req, res) => {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    data.splice(req.params.id, 1);
    await fs.writeFile(file, JSON.stringify(data));

    res.redirect('/');
});

app.listen(3000);
