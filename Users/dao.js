import model from "./model.js";


export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};
export const findAllUsers = () => model.find();


export const findUserById = (userId) => model.findOne({ loginId: userId });

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = async (username, password) =>
  await model.findOne({ username, password });

export const updateUser = (userId, user) =>
  model.updateOne({ loginId: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ loginId: userId });


export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};


export const findUsersByRole = (role) => model.find({ role: role });
