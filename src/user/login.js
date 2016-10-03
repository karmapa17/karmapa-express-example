import fs from 'fs';
import bcrypt from 'bcryptjs';
import xssEscape from 'xss-escape';

export default function login(req, res) {

  const {username, password} = req.body;
  const json = fs.readFileSync('passwd.txt', 'utf8') || '';
  const data = JSON.parse(json);
  const row = data[username];

  if (row && bcrypt.compareSync(password, row.password)) {
    return res.send(`Login Successfully. Hello ! ${xssEscape(username)}`);
  }
  res.status(404)
    .send('User not found.');
}
