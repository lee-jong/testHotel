const next = require('next');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routes = require('../routes');
const handle = routes.getRequestHandler(app);
const config = require('./config');
const middlewares = require('./middlewares');
const confirmInfo = require('./middlewares/confirmInfo');
app
  .prepare()
  .then(() => {
    const server = express();

    middlewares(server);
    confirmInfo(server, app);

    server.use(handle).listen(config.PORT, err => {
      if (err) throw err;
      console.log('Ready on ' + config.PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
