const port = 8081,
  express = require('express'),
  app = express();

app.use(require('./routes'));

app.listen(port);
