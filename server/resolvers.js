const Product = require("./model/productModel");

const resolvers = {
    Query: {
       products: async (root, {filters, offset, limit}) => 
         await Product.find(filters).limit(limit).skip(offset)
    },
  };
  
  module.exports = resolvers;