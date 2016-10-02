import express from 'express';
import bodyParser from 'body-parser';

import * as home from './home';
import * as err from './err';
import * as user from './user';

const port = process.env.PORT || 3000;
const app = express();

app.locals.secret = 'YOU-CANT-SEE-ME';

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', home.getName, home.greet);

app.get('/err', err.throwError);

app.post('/login', user.getUser, user.login);

app.use((err, req, res, next) => {
  console.error('Error: %s', err);
  res.status(500)
    .send('Sorry ! Something has gone wrong.');
});

app.listen(port, () => {
  console.log('Example app listening on port %s', port);
});
