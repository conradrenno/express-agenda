require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware');


const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');

const route = require('./route');
const path = require('path');
const helmet = require('helmet');

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => app.emit('ready'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'secretkey84@ aka !akakakasdf',
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'view'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(csrfMiddleware);

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(route);

const PORT = process.env.PORT || 3000;
app.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`Executing on http://localhost:${PORT}/`);
        console.log(`Server is running on port ${PORT}`);
    });
});
