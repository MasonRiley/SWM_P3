setInterval(() => {
  const http = require('http');
  var items = ['Hotdog', 'Hamburger', 'Soda', 'Cookie'];
  var choice = Math.floor(Math.random() * 4);
  var item = items[choice];
  var quantity = Math.floor(Math.random() * 10) + 1;
  var url = `http://localhost:80/purchase/${item}/${quantity}`;

  console.log(`Choice: ${choice}`);
  console.log(`Item: ${item}`);
  console.log(`Quantity: ${quantity}`);
  console.log(`URL: ${url}`);
  http.get(url, (httpreq, httpres) => {
    var body = [];

    httpreq.on('data', (bodyData) => {
      body.push(bodyData);
    });

    httpreq.on('end', () => {
      console.log("...running...");
    });
  });
}, 3000);
