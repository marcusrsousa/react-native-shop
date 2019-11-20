const Product = require("./model/product");
const Merchant = require("./model/merchant");
const User = require("./model/user");
const Order = require("./model/order");

const resolvers = {
  Query: {
    products: async (root, { filters, offset, limit }) => {
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
    },
    user: async (root, { user }) =>
      User.findOne(user).then(({ _id, name }) => ({ userId: _id, name }))
  },
  Mutation: {
    addUser: async (root, { user }) => {
      const savedUser = await User.findOne({ email: user.email });
      if (savedUser) {
        throw new Error("Email already exists.");
      }
      return await new User(user)
        .save()
        .then(result => ({ userId: result._id }));
    },
    addOrder: async (root, { order }) => {
      return await new Order(order).save().then(result => ({ id: result._id }));
    }
  }
};

module.exports = resolvers;
