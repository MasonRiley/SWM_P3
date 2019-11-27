const port = 69696,
  express = require('express'),
  app = express();

app.use(require('./routes'));

app.listen(port);
