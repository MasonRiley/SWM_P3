const port = 65432,
  express = require('express'),
  app = express();

app.use(require('./routes'));

 app.listen(port, () => {
});
