const Product = require("./model/product");
const User = require("./model/user");

const resolvers = {
  Query: {
    products: async (root, { filters, offset, limit }) =>
      await Product.find(filters)
        .limit(limit)
        .skip(offset),
    user: async (root, { user }) =>
      User.findOne(user).then(result => ({ userId: result._id }))
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
    }
  }
};

module.exports = resolvers;
