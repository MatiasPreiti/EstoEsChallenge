const proyectRepository = require('../repositories/proyects');
const userService = require('../services/users');
const paginateRequest = require('../services/pagination');
const limit = 5;

const getAll = async (req) => {
  const maxCount = await proyectRepository.getCount();
  const paginationData = paginateRequest.pagination(
    limit,
    maxCount,
    req,
    'proyects'
  );
  const proyects = await proyectRepository.getAll(limit, paginationData.offset);

  // default answer, intermediate pages
  let response = {
    maxCount: paginationData.maxCount,
    previousPage: paginationData.previousPageUrl,
    nextPage: paginationData.nextPageUrl,
    data: proyects
  };

  // page 1
  if (page == 1) {
    response.previousPage = null;
  }

  if (page == paginationData.lastPage) {
    //last page
    response.nextPage = null;
  }

  return response;
};

const getById = async (id) => {
  const response = await proyectRepository.getById(id);
  if (!response) {
    const error = new Error(
      'it has not been possible to find a Project with that Id.'
    );
    error.status = 404;
    throw error;
  }
  return response;
};

const getByName = async (name) => {
  const response = await proyectRepository.getByName(name);
  if (!response) {
    const error = new Error(
      'it has not been possible to find a Project with that Name.'
    );
    error.status = 404;
    throw error;
  }
  return response;
};

const create = async ({ name, description, manager, asignedTo, status }) => {
  const response = await proyectRepository.create({
    name,
    description,
    manager,
    asignedTo,
    status
  });
  if (!response) {
    const error = new Error('Error whit create Proyect');
    error.status = 404;
    throw error;
  }
  return response;
};

const update = async (
  { name, description, manager, asignedTo, status },
  id
) => {
  const foundProyect = await proyectRepository.getById(id);
  console.log(foundProyect);
  if (!foundProyect) {
    const error = new Error(`Not Found Proyect`);
    error.status = 409;
    throw error;
  }
  const response = await proyectRepository.update(
    { name, description, manager, asignedTo, status },
    id
  );
  if (!response) {
    const error = new Error('Error updating Proyect');
    error.status = 409;
    throw error;
  }
  return await proyectRepository.getById(id);
};

const assing = async (id, data) => {
  const findProyect = await proyectRepository.getById(id);
  const findUser = await userService.existEmailUser(data.email);
  if (findProyect && findUser) {
    await proyectRepository.assing(findProyect.dataValues.id, {
      assignedTo: findUser.dataValues.id
    });
    return await proyectRepository.getById(id);
  }
  const error = new Error('invalid project or user');
  error.status = 409;
  throw error;
};

const remove = async (id) => {
  const foundProyect = await proyectRepository.getById(id);
  if (!foundProyect) {
    const error = new Error(`Not Found Proyect whit id: ${id}`);
    error.status = 404;
    throw error;
  }
  return await proyectRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  getByName,
  update,
  assing,
  remove
};
