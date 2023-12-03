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
    secret: '<21105665d>_eie4432_lab4',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
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
app.get('/logged', (req, res) => {
  if (req.session.logged) {
    res.redirect('/logged.html');
  } else {
    res.redirect('/login.html');
  }
});
app.get('/login', (req, res) => {
  if (req.session.logged) {
    res.redirect('/logged.html');
  } else {
    res.redirect('/login.html');
  }
});
app.use('/', express.static('static'));

app.listen(8080, '127.0.0.1', () => {
  var d = new Date();
  var currentDate = d.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
  console.log(currentDate);
  console.log('Server started at http://127.0.0.1:8080');
});

process.on('SIGUSR2', () => {
  var d = new Date();
  var currentDate = d.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });
  console.log(currentDate);
  console.log('Server started at http://127.0.0.1:8080');
});
