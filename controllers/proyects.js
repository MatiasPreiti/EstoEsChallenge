const proyectsService = require('../services/proyects');

const getAll = async (req, res, next) => {
  try {
    const page = +req.query.page;
    const response = await proyectsService.getAll(req, page);
    res.status(200).json({
      status: 200,
      data: response,
      previousPage: response.previousPage,
      nextPage: response.nextPage
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await proyectsService.getById(id);
    res.status(200).json({
      status: 200,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const response = await proyectsService.getByName(name);
    res.status(200).json({
      status: 200,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const response = await proyectsService.create(req.body);
    res.status(200).json({
      status: 200,
      msg: `Proyect: ${response.name} has been created`,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    console.log('controlador');
    const response = await proyectsService.update(req.body, req.params.id);
    res.status(200).json({
      status: 200,
      msg: `Proyect: ${response.name} has been update succefully`,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

const assing = async (req, res, next) => {
  try {
    const response = await proyectsService.assing(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      msg: 'the project was successfully assigned',
      data: response
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await proyectsService.remove(id);
    res
      .status(200)
      .json({ status: 200, message: 'the proyect was delete succesfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  assing,
  remove
};
