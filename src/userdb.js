//21096764d Liu Jiahao
//21105665d Gong Zhaoyuan

import fs from 'fs/promises';
import client from './dbclient.js';

function printCurrentDateTime() {
  const now = new Date();
  console.log(now.toLocaleString());
}
async function update_user(username, password, role, enabled) {
  const db = client.db('lab5db');
  const users = db.collection('users');

  try {
    const updateResult = await users.updateOne(
      { username: username },
      { $set: { password: password, role: role, enabled: enabled } },
      { upsert: true }
    );

    if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 1) {
      console.log('Added 1 user');
    } else if (updateResult.matchedCount === 1) {
      console.log('Updated 1 user');
    } else {
      console.log('Added 0 user');
    }

    return true;
  } catch (error) {
    console.error('Unable to update the database!', error);
    return false;
  }
}

async function validate_user(username, password) {
  if (!username || !password) {
    return false; // 如果用户名或密码为空，返回 false
  }

  const db = client.db('lab5db');
  const users = db.collection('users');

  try {
    // 查询数据库以查找匹配的用户
    const user = await users.findOne({ username: username, password: password });
    if (user) {
      return user; // 返回用户信息
    } else {
      return false; // 用户名不存在或密码不匹配
    }
  } catch (error) {
    console.error('Unable to fetch from database!', error);
    return false; // 数据库操作中出现错误
  }
}

async function init_db() {
  try {
    const users = client.db('lab5db').collection('users');
    const userCount = await users.countDocuments();

    if (userCount === 0) {
      const data = await fs.readFile('users.json', 'utf8');
      const userArray = JSON.parse(data);
      const result = await users.insertMany(userArray);
      printCurrentDateTime(); // 打印当前日期和时间
      console.log(`Successfully connected to the database!`);
      console.log(`Added ${result.insertedCount} users`);
    } else {
      printCurrentDateTime(); // 打印当前日期和时间
      console.log(`Successfully connected to the database!`);
      console.log('No new users were added');
    }
  } catch (err) {
    printCurrentDateTime(); // 打印当前日期和时间
    console.error('Unable to establish connection to the database!', err);
    process.exit(1);
  }
}

async function username_exist(username) {
  try {
    const user = await fetch_user(username);
    return user !== null; // 如果 user 对象存在，返回 true，否则返回 false
  } catch (error) {
    console.error('Unable to fetch from database!', error);
    return false; // 发生错误时返回 false
  }
}

async function runValidationTests() {
  try {
    await init_db();

    username_exist('anyone').then((res) => console.log(res));

    username_exist('').then((res) => console.log(res));
  } catch (error) {
    console.error('Error during database operations:', error);
  }
}

async function fetch_user(username) {
  const db = client.db('lab5db');
  const users = db.collection('users');

  try {
    const user = await users.findOne({ username: username });
    return user; // 直接返回检索到的用户对象
  } catch (error) {
    console.error('Unable to fetch from database!', error);
    throw error; // 重新抛出错误以便调用者处理
  }
}

runValidationTests();
export { validate_user, update_user, fetch_user, username_exist };
