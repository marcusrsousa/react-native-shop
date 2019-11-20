const { findProducts } = require("./repository/product");
const { addUser, getUser } = require("./repository/user");
const { addOrder } = require("./repository/order");

const resolvers = {
  Query: {
    products: async (root, { filters, offset, limit }) =>
      await findProducts(filters, offset, limit),
    user: async (root, { user }) => await getUser(user)
  },
  Mutation: {
    addUser: async (root, { user }) => {
      await addUser(user);
    },
    addOrder: async (root, { order }) => addOrder(order)
  }
};

module.exports = resolvers;
