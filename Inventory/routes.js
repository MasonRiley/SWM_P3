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

  var options = {
    //host: 'ec2-3-132-212-11.us-east-2.compute.amazonaws.com',
    host: 'localhost',
    port: 80,
    path: '/',
    method: 'POST',
  };

  var httpReq = http.request(options, (response) => {
    response.setEncoding('utf8');
    response.on('data', function(data) {
    });

    response.on('end', function() {
        res.send(total);
    });
  });

  httpReq.write("");
  httpReq.end();
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
