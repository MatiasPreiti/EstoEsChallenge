const db = require('../models');

const getAll = async (limit, offset) => {
  const proyects = await db.Proyect.findAll({
    limit: limit,
    offset: offset
  });
  return proyects;
};

const getCount = async () => {
  const response = await db.Proyect.count();
  return response;
};

const getById = async (id) => {
  const response = await db.Proyect.findByPk(id);
  return response;
};

const getByName = async (name) => {
  const response = await db.Proyect.findOne({
    where: {
      name: name
    }
  });
  return response;
};

const create = async (data) => {
  const response = await db.Proyect.create(data);
  return response;
};

const update = async (data, id) => {
  const response = await db.Proyect.update(data, {
    where: {
      id: id
    }
  });
  return response;
};

const assing = async (id, data) => {
  const response = await db.Proyect.update(data, {
    where: {
      id: id
    }
  });
  return response;
};

const remove = async (id) => {
  const response = await db.Proyect.destroy({
    where: {
      id
    }
  });
  return response;
};

module.exports = {
  getAll,
  getCount,
  getById,
  getByName,
  create,
  update,
  assing,
  remove
};
