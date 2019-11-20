const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
  userId: String,
  products: [
    {
      id: String,
      qtyToBuy: Number
    }
  ]
});

module.exports = mongoose.model("Order", order);
