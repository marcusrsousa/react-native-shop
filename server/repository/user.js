const User = require("../model/user");

const getUser = async user =>
  User.findOne(user)
    .then(user => {
      if (!user) throw new Error("User not Found!");
      return user;
    })
    .then(({ _id, name }) => ({ userId: _id, name }));

const addUser = async user => {
  const savedUser = await User.findOne({ email: user.email });
  if (savedUser) {
    throw new Error("Email already exists.");
  }
  return await new User(user).save().then(result => ({ userId: result._id }));
};
module.exports = { addUser, getUser };
