const express = require('express');
const jwt = require('jwt-simple');
const uuid = require('uuid/v4');
const secret = process.env.SECRET || 'DEFAULT-SECRET';
const app = express();

app.get('/', (req, res) => {
  let { returnto } = req.query;
  let payload = {
    iat: Math.round(new Date().getTime() / 1000),
    jti: uuid(),
    email: 'jamie.white+customer@kayako.com',
    name: 'Jamie Customer',
    role: 'customer'
  };
  let token = jwt.encode(payload, secret, 'HS512');
  let url = returnto + '&jwt=' + token;

  res.redirect(url);
});

app.get('/logout', (req, res) => {
  let { returnto } = req.query;

  if (returnto) {
    res.redirect(returnto);
  } else {
    res.status(200).end();
  }
});

app.listen(3000);
