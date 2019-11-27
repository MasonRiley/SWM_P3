exports.log = function(data) {
  const fs = require('fs');
  var stream = fs.createWriteStream('/var/log/hotburger/api.log', {flags:'a'});
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +
    ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  stream.write(date + ': ' + data + '\n');
  stream.end();
}
