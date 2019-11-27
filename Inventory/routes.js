const express = require('express'),
      router = express.Router(),
      logger = require('./controllers/logController'),
      querystring = require('querystring'),
      http = require('http'),
      inventoryController = require('./controllers/inventoryController');

router.get('/', (req, res) => {
  res.send('Welcome to the inventory');
});

router.get('/getcount/:item', (req, res) => {
  let total = inventoryController.getTotal(req.params.item);

  logger.log("-1: SUCCESSFUL START");
  var data = querystring.stringify({
    item: req.params.item,
    amount: total
  });

  logger.log("0");
  var options = {
    host: 'http://ec2-3-132-212-11.us-east-2.compute.amazonaws.com',
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var httpreq = http.request(options, function (response) {
    logger.log("1");
    response.setEncoding('utf8');
    response.on('data', function(bodyData) {
      logger.log("2");
    });

    logger.log("3");
    response.on('end', () => {
      logger.log("4");
        res.send(total);
    });
  });
  logger.log("5");
  httpreq.write(data);
  logger.log("6");
  httpreq.end();
});

router.post('/setcount/:item/:quantity', (req, res) => {
  let item = req.params.item;
  let amount = req.params.quantity;

  inventoryController.setTotal(item, amount);
  res.send(`Successfully set total number of ${item}s to ${amount}`);
});

router.get('*', (req, res) => {
  res.send('404: Page not found.');
});

module.exports = router;
