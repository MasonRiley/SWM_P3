const menuModel = require('./../models/menuModel');

exports.printMenu = (req, res) => {
  //Set up HTML
  res.write('<html>');
  res.write('<body>');
  res.write('<p>');

  /*Print the menu, in a more complex case I would refactor
  this by reading the data in from some file via menuController
  to populate the menu, making it easier to extend or change*/
  for(i in menuModel.items) {
    res.write(menuModel.items[i] + ': $' + menuModel.prices[i]);
    res.write('<br>');
  }

  //Finish up HTML
  res.write('</p>');
  res.write('</body>');
  res.write('</html>');
  res.end();
  
  logger.log(('GET 200 - request for ' + req.originalUrl + ' successful.'));
}
