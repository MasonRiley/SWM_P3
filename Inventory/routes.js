const express = require('express'),
      router = express.Router(),
      querystring = require('querystring'),
      http = require('http'),
      inventoryController = require('./controllers/inventoryController');

router.get('/getcount/:item', (req, res) => {
  let total = inventoryController.getTotal(req.params.item);


  var data = querystring.stringify({
    item: req.params.item,
    amount: total//inventoryController.getTotal(req.params.item)
  });

  var options = {
    host: 'localhost',
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function(bodyData) {
    });

    response.on('end', () => {
        res.send(total);
    });
  });

  httpreq.write(data);
  httpreq.end();
});

router.post('/setcount/:item/:quantity', (req, res) => {
  let item = req.params.item;
  let amount = req.params.quantity;

  inventoryController.setTotal(item, amount);
  res.send(`Successfully set total number of ${item}s to ${amount}`);
});

router.get('/', (req, res) => {
  res.send('Welcome to the inventory');
});

router.get('*', (req, res) => {
  res.send('404: Page not found.');
});

module.exports = router;
