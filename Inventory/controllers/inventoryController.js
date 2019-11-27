const inventoryModel = require('./../models/inventoryModel');

exports.getTotal = function(item) {
  var index = inventoryModel.items.indexOf(item);
  return inventoryModel.totals[index];
}

exports.setTotal = function(item, amount) {
  var index = inventoryModel.items.indexOf(item);
  inventoryModel.totals[index] = amount;
}
