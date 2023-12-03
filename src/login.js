//21096764d Liu Jiahao
//21105665d Gong Zhaoyuan
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import session from 'express-session';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(dirname(__filename));
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
  })
);

const users = new Map();

async function init_userdb() {
  if (users.size > 0) {
    return;
  }
  try {
    const fileData = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
    const userData = JSON.parse(fileData);
    userData.forEach((user) => {
      users.set(user.username, user);
    });
  } catch (error) {
    console.error('Error', error);
  }
}

async function validate_user(username, password) {
  const dataName = users.get(username);
  try {
    if (dataName && dataName.enabled === false) {
      return { message: `User '${username}' is currently disabled`, enabled: dataName.enabled, details: dataName };
    }
    if (dataName && dataName.password === password) {
      return { username: dataName.username, role: dataName.role, enabled: dataName.enabled };
    }
    return false;
  } catch (error) {
    console.error('Error', error);
  }
}
const route = express.Router();
const form = multer();

//for login
route.post('/login', upload.none(), async (req, res) => {
  await init_userdb();

  const { username, password } = req.body;
  const user = await validate_user(username, password);

  if (user) {
    if (user.enabled === false) {
      return res.json({ status: 'failed', message: user.message });
    }

    req.session.user = user;
    return res.json({ status: 'success', message: 'Logged in successfully', user });
  } else {
    return res.json({ status: 'failed', message: 'Invalid username or password' });
  }
});

route.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        res.status(500).json({ status: 'failed', message: 'Error logging out' });
      } else {
        res.json({ status: 'success', message: 'Logged out successfully' });
      }
    });
  } else {
    res.status(401).json({ status: 'failed', message: 'Unauthorized' });
  }
});

route.get('/me', (req, res) => {
  if (req.session.user) {
    const { username, role } = req.session.user;

    res.json({ status: 'success', user: { username, role } });
  } else {
    res.status(401).json({ status: 'failed', message: 'Unauthorized' });
  }
});

export default route;
