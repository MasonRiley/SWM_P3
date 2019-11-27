const port = 80,
  express = require('express'),
  app = express()
  logger = require('./controllers/logController');

app.use(require('./routes'));

 app.listen(port, () => {
     logger.log(`The server has started and is listening on port number: ${port}`);
});
