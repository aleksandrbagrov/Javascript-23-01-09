import express from 'express';
import fs from 'node:fs/promises';
import { engine } from 'express-handlebars';
import session from 'express-session';
import { auth } from './middleware/auth.js'
import multer from 'multer';

//CRUD:
//CREATE
//READ
//UPDATE
//DELETE

const app = express();
const file = './database.json';
const gallery = './gallery.json';
const uploadsDir = './uploads';
const storage = multer.diskStorage({
    destination: async (req, file, next) => {
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }

        next(null, uploadsDir);
    },
    filename: (req, file, next) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const nameParts = file.originalname.split('.');
        next(null, uniqueSuffix + '.' + nameParts[nameParts.length - 1]);
    }
});
const upload = multer({ 
    storage,
    fileFilter: (req, file, next) => {
        const allowed = [
            'image/gif',
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/webp'
        ];

        if(allowed.includes(file.mimetype))
            next(null, true);
    }
});
// app.set('trust proxy', 1);

//Sesijos duomenų konfigūracija
app.use(session({
  secret: 'LABAI SLAPTA FRAZĖ',
  resave: false,
  saveUninitialized: true,
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

//Failų perdavimo aktyvavimui naudojama konfigūracinė eilutė
app.use('/uploads', express.static('./uploads'));

//Prisijungimo forma
app.get('/login', (req, res) => {
    res.render('login');
});

//Prisijungimo duomenų tikrinimas
app.post('/login', async (req, res) => {
    let data = JSON.parse(await fs.readFile(file, 'utf-8'));

    const index = data.findIndex(user => user.email === req.body.email && user.password === req.body.password);
    if(index != -1) {
        req.session.loggedIn = true;
        req.session.user = {
            id: index,
            name: data[index].name,
            last_name: data[index].last_name,
            email: data[index].email
        }
        return res.redirect('/');
    }

    res.redirect('/login');
});

//Visų vartotojų sąrašas
app.get('/', auth, async (req, res) => {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    const modifiedData = data.map(user => {
        if(user.email === req.session.user?.email)
            user.current = true;

        return user;
    });

    res.render('admin', {
        user: req.session.user,
        message: req.session.message,
        data: modifiedData
    });

    delete req.session.message;
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
app.post('/new-user', auth, upload.single('photo'), async (req, res) => {
    if(req.file)
        req.body.photo = req.file.path.replace('\\', '/');
        
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

app.get('/delete-user/:id', auth, async (req, res) => {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    // const currentUser = data.findIndex(user => user.email === req.session.user?.email);
    if(req.session.user.id == req.params.id) {
        req.session.message = 'Šio vartotojo ištrynimas negalimas';
        return res.redirect('/');
    }

    data.splice(req.params.id, 1);
    await fs.writeFile(file, JSON.stringify(data));

    res.redirect('/');
});

app.get('/edit-user/:id', auth, async (req, res) => {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));

    res.render('edituser', {
        user: req.session.user,
        message: req.session.message,
        currentUser: data[req.params.id]
    });

    delete req.session.message;
});

app.post('/edit-user/:id', auth, async (req, res) => {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    if(data.find((user, index) => user.email === req.body.email && index != req.params.id)) {
        req.session.message = 'Toks el. pašto adresas jau registruotras';
        return res.redirect('/edit-user/' + req.params.id);
    }

    if(req.session.user.id == req.params.id) {
        req.session.user = req.body;
        console.log(req.session.user);
    }

    data[req.params.id] = req.body;
    await fs.writeFile(file, JSON.stringify(data));

    res.redirect('/');
});

app.get('/logout', auth, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/new-photo', auth, (req, res) => {
    res.render('newphoto');
});

app.post('/new-photo', auth, upload.single('photo'), async (req, res) => {
    if(req.file)
        req.body.photo = req.file.path.replace('\\', '/');
    
    // const users = JSON.parse(await fs.readFile(file, 'utf-8'));
    // req.body.userId = users.findIndex(user => user.email === req.session.user.email);
    req.body.userId = req.session.user.id;
    
    try {
        let data = JSON.parse(await fs.readFile(gallery, 'utf-8'));

        data.push(req.body);
        await fs.writeFile(gallery, JSON.stringify(data));
    } catch {
        await fs.writeFile(gallery, JSON.stringify([req.body]));
    }

    res.redirect('/');
});

app.get('/gallery', auth, async (req, res) => {
    const galleryData = JSON.parse(await fs.readFile(gallery, 'utf-8'));
    const userData = JSON.parse(await fs.readFile(file, 'utf-8'));

    for(const i in galleryData) {
        const userInfo = userData[galleryData[i].userId];
        galleryData[i].userInfo = userInfo;

        if(galleryData[i].ratings) {
            const sum = galleryData[i].ratings.reduce((prev, current) => prev + current.rating, 0);
            galleryData[i].totalRating = (sum / galleryData[i].ratings.length).toFixed(2);
        }
    }

    res.render('gallery', { data: galleryData });
});

app.post('/gallery/:id', auth, async (req, res) => {
    // req.params.id
    const galleryData = JSON.parse(await fs.readFile(gallery, 'utf-8'));
    const ratingData = {
        rating: +req.body.rating,
        userId: req.session.user.id
    };

    if(!galleryData[req.params.id].ratings) {
        galleryData[req.params.id].ratings = [ratingData];
    } else {
        galleryData[req.params.id].ratings.push(ratingData);
    }

    await fs.writeFile(gallery, JSON.stringify(galleryData));

    res.redirect('/gallery');
});

app.listen(3000);
