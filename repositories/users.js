const db = require('../models');

const getAll = async () => {
  const response = await db.User.findAll();
  return response;
};

const getById = async (id) => {
  const response = await db.User.findByPk(id, {
    attributes: {
      exclude: ['password']
    }
  });
  return response;
};

const create = async (userData) => {
  const user = await db.User.create(userData);
  return user;
};

const update = async (data, id) => {
  const response = await db.User.update(data, {
    where: {
      id: id
    }
  });
  return response;
};

const remove = async (id) => {
  const respose = await db.User.destroy({
    where: {
      id
    }
  });
  return respose;
};

const getByEmail = async (email) => {
  const response = await db.User.findOne({
    where: {
      email: email
    }
  });
  return response;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByEmail
};
