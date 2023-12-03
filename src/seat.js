//21096764d Liu Jiahao
//21105665d Gong Zhaoyuan
import express from 'express';
import session from 'express-session';
import route from './login.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/auth', route);

app.get('/', (req, res) => {
  if (req.session.logged) {
    res.redirect('/logged.html');
  } else {
    res.redirect('/login.html');
  }
});
app.use('/', express.static('static'));
