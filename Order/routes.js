const express = require('express'),
      router = express.Router(),
      http = require('http'),
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

  var url = `http://localhost:8081/getcount/${item}`;
  //var url = `http://ec2-3-132-212-11.us-east-2.compute.amazonaws.com:8081/getcount/${item}`;

  var options = {
    //host: 'localhost',
    host: 'ec2-3-132-212-11.us-east-2.compute.amazonaws.com',
    port: 8081,
    path: `/getcount/${item}`,
    method: 'GET'
  }

  var data = "";
  var httpReq = http.request(options, (response) => {
    response.setEncoding('utf8');
    response.on('data', function(chunk) {
      data += chunk;
    });
    response.on('end', function() {
      var numStocked = Number(data);
      var numRequested = Number(quantity);

      if(numStocked >= numRequested) {
        res.send('Successfully ordered ' + quantity + ' ' + item + '(s)');
        logger.log(`ORDER ${item} ${price} ${quantity}`);
      }
      else {
        res.send(`Sorry, we don\'t have ${quantity} ${item}(s)`);
        logger.log(`FAILED_ORDER: ${item} ${price} ${quantity}`);
      }
    });
  });
  httpReq.write("");
  httpReq.end();
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
