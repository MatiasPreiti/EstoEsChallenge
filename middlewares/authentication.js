const security = require('../middlewares/tokenSecurity');
const usersService = require('../services/users');
const rolesService = require('../services/roles');
const proyectService = require('../services/proyects');

const tokenId = (req) => {
  const token = req.headers['authorization'];
  if (!token) {
    const error = new Error('No token provided!');
    error.status = 401;
    throw error;
  }
  const decodedUser = security.verifyToken(token);
  if (!decodedUser) {
    const error = new Error(
      'Unauthorized! Please enter a valid token provided at login'
    );
    error.status = 403;
    throw error;
  }
  return decodedUser.id;
};

const isLoggedUser = async (req, res, next) => {
  try {
    req.userId = tokenId(req);
    next();
  } catch (error) {
    next(error);
  }
};

const isOwnProyect = async (req, res, next) => {
  try {
    const reqId = tokenId(req);
    const { id } = req.params;
    const userFound = await usersService.getById(reqId);
    if (!userFound) {
      const error = new Error('no user found');
      error.status = 404;
      throw error;
    }
    const role = await rolesService.getByName('Admin');
    if (!role) {
      const error = new Error('no role found');
      error.status = 404;
      throw error;
    }
    if (userFound.roleId === role.id) {
      return next();
    }
    const proyect = await proyectService.getById(id);
    if (proyect.dataValues.UserId === userFound.id) {
      console.log('asdasdas');
      return next();
    }
    const error = new Error(
      'You cannot exercise this option as you do not own the project or you are not an admin'
    );
    error.status = 403;
    throw error;
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const id = tokenId(req);
    const userFound = await usersService.getById(id);
    if (!userFound) {
      const error = new Error('no user found');
      error.status = 404;
      throw error;
    }
    const role = await rolesService.getByName('Admin');
    if (!role) {
      const error = new Error('no role found');
      error.status = 404;
      throw error;
    }
    if (userFound.roleId !== role.id) {
      const error = new Error('Requiere admin role');
      error.status = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAdmin, isLoggedUser, isOwnProyect };
