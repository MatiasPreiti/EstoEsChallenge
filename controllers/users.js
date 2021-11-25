const usersService = require('../services/users');
const security = require('../middlewares/tokenSecurity');

const getAll = async (req, res, next) => {
  try {
    const response = await usersService.getAll();
    res.status(200).json({ status: 200, data: response });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await usersService.getById(id);
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
    const response = await usersService.create(req.body);
    const token = security.generateToken(response);
    res.status(200).json({
      success: true,
      msg: `${response.firstName} your user has been created`,
      data: response,
      token: token
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await usersService.update(req.body, req.params.id);
    res.status(200).json({
      status: 200,
      msg: `User ${req.params.id} is updated succesfully`,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const response = await usersService.remove(req.params.id);
    return res
      .status(200)
      .json({ status: 200, message: 'the user was delete succesfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
