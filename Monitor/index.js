const port = 8080,
  express = require('express'),
  app = express()
  logger = require('./controllers/logController');

app.use(require('./routes'));

app.listen(port);
