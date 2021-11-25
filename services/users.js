const bcrypt = require('bcryptjs');
const usersRepository = require('../repositories/users');

const getAll = async () => {
  const response = await usersRepository.getAll();
  return response;
};

const getById = async (id) => {
  return await usersRepository.getById(id);
};

const existEmailUser = async (email) => {
  const response = await usersRepository.getByEmail(email);
  return response;
};

const create = async (userData) => {
  let existingUser = await usersRepository.getByEmail(userData.email);
  if (existingUser) {
    const error = new Error('Invalid Email 2');
    error.status = 404;
    throw error;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: hashedPassword,
    email: userData.email,
    roleId: userData.roleId
  };

  const usersCreated = await usersRepository.create(newUser);
  return usersCreated;
};

const update = async (data, id) => {
  const user = usersRepository.getById(id);
  if (!user) {
    const error = new Error('User not found!.');
    error.status = 404;
    throw error;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const userUpdated = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    roleId: data.roleId,
    photo: data.photo
  };

  await usersRepository.update(userUpdated, id);

  const updatedUser = await usersRepository.getById(id);
  return updatedUser;
};

const remove = async (id) => {
  const user = await usersRepository.getById(id);
  if (!user) {
    const error = new Error('User not found!.');
    error.status = 404;
    throw error;
  }
  return await usersRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  existEmailUser
};
