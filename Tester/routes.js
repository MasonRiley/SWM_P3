const express = require('express'),
      router = express.Router(),
      http = require('http'),
      querystring = require('querystring');

router.get('/', (req, res) => {
  setInterval(run, 3000);
  res.send("Running test...");
});

function run() {
  var items = ['Hotdog', 'Hamburger', 'Soda', 'Cookie'];
  var choice = Math.floor(Math.random() * 4);
  var item = items[choice];
  var quantity = Math.floor(Math.random() * 10) + 1;

  console.log(`Item: ${item}`);
  console.log(`Quantity: ${quantity}`);

  var options = {
    //host: 'localhost',
    host: 'ec2-3-132-212-11.us-east-2.compute.amazonaws.com',
    port: 80,
    path: `/purchase/${item}/${quantity}`,
    method: 'POST'
  };

  var httpReq = http.request(options, (response) => {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log("Response: " + chunk);
    });
    response.on('end', function() {
    });
  });
  httpReq.write("");
  httpReq.end();
}


router.get('*', (req, res) => {
    res.send('404: Page not found.');
});

module.exports = router;
