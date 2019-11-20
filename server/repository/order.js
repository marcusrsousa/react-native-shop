const Order = require("../model/order");

const addOrder = async order =>
  await new Order(order).save().then(result => ({ id: result._id }));
module.exports = { addOrder };
