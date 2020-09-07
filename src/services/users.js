const { User } = require('../models');

const getInstance = async (data) => {
  const user = new User(data);
  return user;
};

const getMutable = (data) => {
  let mutable = data.toJSON();
  // Remove password from final result
  delete mutable.password;
  return mutable;
};

const save = async (data) => {
  const user = new User(data);
  const saved = await user.save();
  return saved;
};

const getAll = async () => {
  const users = await User.find().select('-password');
  return users;
};

const getById = async (id) => {
  const user = await User.findById(id).select('-password');
  return user;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ email }).select('-password');
  return user;
};

module.exports = {
  getInstance,
  getMutable,
  save,
  getAll,
  getById,
  getByEmail
};
