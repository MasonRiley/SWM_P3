const express = require('express'),
      router = express.Router(),
      logger = require('./controllers/logController'),
      menuController = require('./controllers/menuController'),
      menu = require('./views/menuView');

router.get('/', (req, res) => {
  res.send('Welcome to HotBurger!');
  logger.log(('GET 200 - request for ' + req.originalUrl + ' successful.'));
});

router.get('/version', (req, res) => {
  res.send('This is version 1 of the HotBurger service.');
  logger.log(('GET 200 - request for ' + req.originalUrl + ' successful.'));
});

router.get('/getmenu', menu.printMenu);

router.post('/purchase/:item/:quantity', (req, res) => {
  let item = req.params.item;
  let quantity = req.params.quantity;
  let price = menuController.getPrice(item);

  res.send('Successfully ordered ' + quantity + ' ' + item + '(s)');
  logger.log(`ORDER ${item} ${price} ${quantity}`);
});

//Threw this route in here so that it didn't impact getLastRequestStatus
router.get('/favicon.ico', (req,res) => {
  res.status(204);
});

router.get('*', (req, res) => {
  logger.log(('GET 404 - request for ' + req.originalUrl + ' unsuccessful - does not exist.'));
  res.send('404: Page not found.');
});

module.exports = router;
