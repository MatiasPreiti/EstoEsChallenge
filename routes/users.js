const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/authentication');
const validateMiddleware = require('../middlewares/usersValidateData');

/**
 *@swagger
 *  {
 *    "components": {
 *      "schemas": {
 *        "User": {
 *          "type": "object",
 *          "properties": {
 *            "firstName": {
 *              "type": "string",
 *              "description": "User Firts Name"
 *             },
 *            "lastName": {
 *              "type": "string",
 *              "description": "User Last Name"
 *            },
 *            "email": {
 *              "type": "string",
 *              "description": "User Email"
 *            },
 *            "password": {
 *              "type": "string",
 *            },
 *            "roleId":{
 *             "type": "Integer",
 *              "description": "Standar User or Admin"
 *            }
 *          },
 *         "required": [  "firstName", "lastName", "email", "password", "roleId"],
 *          "example": {
 *            "firstName": "Matias",
 *            "lastName": "Preiti",
 *            "email": "prueba@gmail.com",
 *            "password": "0303456",
 *            "roleId": 1
 *          }
 *       }
 *     }
 *   }
 *}
 */

/**
 * @swagger
 * "/users": {
 *    "get": {
 *      "summary": "list of all User, admin is require",
 *      "tags": ["User"],
 *      "responses": {
 *        "200":{"description":"succesful"},
 *        "content": {
 *            "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "items": {
 *                  "$ref": "#/components/schemas/User"
 *                 }
 *               }
 *          }
 *      },
 *     "404":{"description":"Not found Users"},
 *     "500":{"description":"Internal Server Error"}
 *     },
 *     "security":[{"token":[]}]
 *    }
 * }
 */

usersRouter.get('/', authMiddleware.isAdmin, usersController.getAll);

/**
 * @swagger
 *{
 *    "/users/{id}": {
 *       "get": {
 *             "summary": "Get a User by id, Admin is require",
 *             "tags": [ "User" ],
 *             "parameters": [
 *                 {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "The id of the User",
 *                 "required": false,
 *                 "type": "integer",
 *                 "example": 1
 *                 }
 *             ],
 *             "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "successful operation"
 *                 },
 *                 "404": {
 *                   "description": "User not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
usersRouter.get('/:id', authMiddleware.isAdmin, usersController.getById);

/**
 * @swagger
 *{
 *    "/users/{id}": {
 *       "put": {
 *             "summary": "Update a user by id, ownProyect is require",
 *             "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "Id of the User",
 *                 "required": true,
 *                 "type": "integer"
 *               },
 *             ],
 *       "requestBody": {
 *        "required": true,
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "$ref": "#/components/schemas/User"
 *                }
 *            }
 *         }
 *      },
 *             "tags": [ "User" ],
 *             "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "User has been Update"
 *                 },
 *                 "404": {
 *                   "description": "User not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
usersRouter.put(
  '/:id',
  authMiddleware.isOwnProyect,
  validateMiddleware.validateUser,
  usersController.update
);

/**
 * @swagger
 * "/users/login": {
 *    "post": {
 *      "summary": "Login a user",
 *      "tags": ["User"],
 *      "requestBody": {
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "example":{
 *                  "email":"prueba@gmail.com",
 *                  "password": "0303456"
 *                  }
 *                }
 *            }
 *         }
 *      },
 *      "responses": {
 *      "200":{"description":"User Loged"},
 *      "400":{"description":"User does't exist"},
 *      "422":{"description":"Validations"},
 *      "500":{"description":"Internal Server Error"}
 *      }
 *    }
 * }
 */

usersRouter.post(
  '/login',
  validateMiddleware.validateLogin,
  authController.login
);

/**
 * @swagger
 * "/users/register": {
 *    "post": {
 *      "summary": "Create a new User",
 *      "tags": ["User"],
 *      "requestBody": {
 *        "required": true,
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "$ref": "#/components/schemas/User"
 *                }
 *            }
 *         }
 *      },
 *      "responses": {
 *      "200":{"description":"User Created"},
 *      "404":{"description":"User already exists"},
 *      "422":{"description":"Validations"},
 *      "500":{"description":"Internal Server Error"}
 *      }
 *    }
 * }
 */
usersRouter.post(
  '/register',
  validateMiddleware.validateUser,
  usersController.create
);

/**
 * @swagger
 *{
 *    "/users/{id}": {
 *       "delete": {
 *             "summary": "Delete a User by id, admin is require",
 *             "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "User Id",
 *                 "required": true,
 *                 "type": "integer"
 *              }
 *             ],
 *             "tags": [ "User" ],
 *             "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "User has been Delete"
 *                 },
 *                 "404": {
 *                   "description": "User not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
usersRouter.delete('/:id', authMiddleware.isAdmin, usersController.remove);

module.exports = usersRouter;
