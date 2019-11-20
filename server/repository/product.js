const Product = require("../model/product");
const Merchant = require("../model/merchant");

const findProducts = async (filters, offset, limit) => {
  const { merchantName, maxPrice, minPrice, ...productFilters } = filters;
  const merchantFilters = {
    publishedState: true
  };

  if (merchantName) {
    merchantFilters.name = merchantName;
  }

  merchants = await Merchant.find(merchantFilters);
  const price = { $gte: filters.minPrice || 0 };

  if (maxPrice) {
    price.$lte = maxPrice;
  }

  return await Product.find({
    ...productFilters,
    merchant: { $in: merchants },
    price
  })
    .populate("merchant")
    .limit(limit)
    .skip(offset);
};

module.exports = { findProducts };
