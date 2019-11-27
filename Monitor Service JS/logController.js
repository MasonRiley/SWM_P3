exports.log = function(data) {
  const fs = require('fs');
  var stream = fs.createWriteStream('/var/log/hotburger/api.log', {flags:'a'});
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +
    ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  stream.write(date + ': ' + data + '\n');
  stream.end();
}

exports.getTotal = (req, res) => {
  const fs = require('fs');
  var total = 0;

  //Read in log file and separate by line
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  var i;
  for(i = 0; i < array.length; ++i) {
    //Now separate each line by whitespace
    var line = new Array();
    line = array[i].split(" ");

    //Search for each instance of 'ORDER' and add (price*quantity) to total
    for(j = 0; j < line.length; ++j) {
      var strComp = line[j].localeCompare("ORDER");

      if(strComp == 0) {
        ++j; //Skip the word 'ORDER'
        var price = parseInt(line[++j], 10);
        var quantity = parseInt(line[++j], 10);
        total += price * quantity;
        break;
      }
    }
  }

  res.send('Total amount of earnings thus far is $' + total + ".");
}

exports.getTopSeller = (req, res) => {
  const fs = require('fs');
  const items = ['Hotdog', 'Hamburger', 'Cookie', 'Soda'];
  var quantities = [0, 0, 0, 0];
  var index;

  //Read in log file and separate by line
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  var i;
  for(i = 0; i < array.length; ++i) {
    //Now separate each line by whitespace
    var line = new Array();
    line = array[i].split(" ");

    //Search for each instance of 'ORDER' and add (price*quantity) to total
    for(j = 0; j < line.length; ++j)
    {
      var strComp = line[j].localeCompare("ORDER");
      if(strComp == 0) {
        index = indexOfItem(items, line[++j]);
        quantities[index]++;
      }
    }
  }

  var saleExists = false;
  for(i = 0; i < quantities.length; ++i) {
    if(quantities[i] > 0) saleExists = true;
  }

  if(saleExists) {
    index = indexOfMax(quantities);
    res.send('Top seller thus far are ' + items[index].toLowerCase() + 's.');
  }
  else {
    res.send('No items have been sold yet.');
  }
}

exports.getRequestCount = (req, res) => {
  const fs = require('fs');
  var total = 0;

  //Read in log file and separate by line
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  var i;
  for(i = 0; i < array.length; ++i) {
    //Now separate each line by whitespace
    var line = new Array();
    line = array[i].split(" ");

    //Search for each instance of 'ORDER' and add (price*quantity) to total
    for(j = 0; j < line.length; ++j) {
      var strComp = line[j].localeCompare("GET");

      if(strComp == 0) {
        ++total;
        break;
      }
    }
  }

  res.send('Total amount of requests thus far is ' + total + ".");
}

exports.getLastRequestStatus = (req, res) => {
  const fs = require('fs');
  var requestLine;

  //Read in log file and separate by line
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  for(i = 0; i < array.length; ++i) {
    //Now separate each line by whitespace
    var line = new Array();
    line = array[i].split(" ");

    //Search for each instance of 'ORDER' and add (price*quantity) to total
    for(j = 0; j < line.length; ++j) {
      var strComp = line[j].localeCompare("GET");

      if(strComp == 0) {
          requestLine = array[i];
          break;
      }
    }
  }

  var successCode = "200";
  line = requestLine.split(" ");
  strComp = successCode.localeCompare(line[3]);
  if(strComp == 0) {
    res.send('Last request was successful.');
  }
  else {
    res.send('Last request was unsuccessful.');
  }
}

exports.getLastRequestTime = (req, res) => {
  const fs = require('fs');
  var requestLine;

  //Read in log file and separate by line
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  for(i = 0; i < array.length; ++i) {
    //Now separate each line by whitespace
    var line = new Array();
    line = array[i].split(" ");

    //Search for each instance of 'ORDER' and add (price*quantity) to total
    for(j = 0; j < line.length; ++j) {
      var strComp = line[j].localeCompare("GET");

      if(strComp == 0) {
          requestLine = array[i];
          break;
      }
    }
  }

  line = requestLine.split(" ");
  res.send('Last request occured on ' + line[0] + ' at ' + line[1]);
}

/**********************Helper Methods*********************
 * I'm sure the two methods below are available as array *
 * methods, but they were a fun exercise to write.       *
 *********************************************************/
function indexOfItem(items, itemName) {
  var strComp;
  var i;

  for(i = 0; i < items.length; ++i) {
    strComp = items[i].localeCompare(itemName);
    if(strComp == 0) {
      return i;
      break;
    }
  }
  return -1;
}

function indexOfMax(intArr) {
  var max = 0;
  var index;
  var i;

  for(i = 0; i < intArr.length; ++i) {
    if(intArr[i] > max) {
      max = intArr[i];
      index = i;
    }
  }

  return index;
}

/**
 * @deprecated Since version 0.0. Can't bring myself to delete because I spent
 * a bit of time figuring out how to get this done.
 */
exports.printLogs = (req, res) => {
  const fs = require('fs');
  var array = fs.readFileSync('/var/log/hotburger/api.log').toString().split("\n");

  var logger = require('./logController');
  logger.log(('GET for ' + req.originalUrl + ' successful.'));

  //Set up HTML
  res.write('<html>');
  res.write('<body>');
  res.write('<p>');

  //Print each log entry
  for(i in array) {
    res.write(array[i]);
    res.write('<br>');
  }

  //Finish up HTML
  res.write('</p>');
  res.write('</body>');
  res.write('</html>');
  res.end();
}
