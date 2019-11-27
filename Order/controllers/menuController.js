const menuModel = require('./../models/menuModel');

exports.getPrice = function(item) {
  var index = menuModel.items.indexOf(item); 
  return menuModel.prices[index];
}
