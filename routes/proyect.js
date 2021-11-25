const express = require('express');
const proyectRouter = express.Router();
const proyectController = require('../controllers/proyects');
const authMiddleware = require('../middlewares/authentication');
const validateMiddleware = require('../middlewares/proyectValidateData');
const pagination = require('../middlewares/pagination');
/**
 *@swagger
 *  {
 *    "components": {
 *      "schemas": {
 *        "Proyect": {
 *          "type": "object",
 *          "properties": {
 *            "name": {
 *              "type": "string",
 *              "description": "Proyect Name"
 *             },
 *            "description": {
 *              "type": "string",
 *              "description": "Proyect description"
 *            },
 *            "userId": {
 *              "type": "string",
 *              "description": "Creator user Id"
 *            },
 *            "assignedTo": {
 *              "type": "string",
 *               "description": "designed User"
 *            },
 *            "status":{
 *             "type": "string",
 *              "description": "Proyect status"
 *            }
 *          },
 *         "required": [  "name", "decription", "userId", "assignedTo", "status"],
 *          "example": {
 *            "name": "Esto Es Challenge",
 *            "description": "Api created for Challenge Backend Esto Es",
 *            "userId": "1",
 *            "assignedTo": "2",
 *            "status": "developing"
 *          }
 *       }
 *     }
 *   }
 *}
 */

/**
 * @swagger
 * "/proyects": {
 *    "get": {
 *      "summary": "list of all proyects, logged is requiere",
 *      "tags": ["Proyect"],
 *        "parameters": [
 *               {
 *                 "name": "page",
 *                 "in": "query",
 *                 "description": "Page number",
 *                 "type": "integer"
 *               }
 *             ],
 *      "responses": {
 *        "200":{"description":"succesful"},
 *        "content": {
 *            "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "items": {
 *                  "$ref": "#/components/schemas/Proyect"
 *                 }
 *               }
 *          }
 *      },
 *     "404":{"description":"Proyect Not found"},
 *     "500":{"description":"Internal Server Error"}
 *     },
 *     "security":[{"token":[]}]
 *    }
 * }
 */

proyectRouter.get(
  '/',
  authMiddleware.isLoggedUser,
  pagination.validate,
  proyectController.getAll
);

/**
 * @swagger
 *{
 *    "/proyects/{id}": {
 *       "get": {
 *             "summary": "Get a Proyect by id, Logged is require",
 *             "tags": [ "Proyect" ],
 *             "parameters": [
 *                 {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "The id of the Proyect",
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
 *                   "description": "News not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
proyectRouter.get(
  '/:id',
  authMiddleware.isLoggedUser,
  proyectController.getById
);

/**
 * @swagger
 *{
 *    "/proyects/findName/{name}": {
 *       "get": {
 *             "summary": "Get a Proyect by Name, Logged is require",
 *             "tags": [ "Proyect" ],
 *             "parameters": [
 *                 {
 *                 "name": "name",
 *                 "in": "path",
 *                 "description": "The name of the Proyect",
 *                 "required": false,
 *                 "type": "string",
 *                 "example": "Esto Es Challenge"
 *                 }
 *             ],
 *             "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "successful operation"
 *                 },
 *                 "404": {
 *                   "description": "Proyect not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
proyectRouter.get(
  '/findName/:name',
  authMiddleware.isLoggedUser,
  proyectController.getByName
);

/**
 * @swagger
 *{
 *    "/proyects": {
 *       "post": {
 *             "summary": "Create a Proyect, Admin is require",
 *      "requestBody": {
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                "$ref": "#/components/schemas/Proyect"
 *                }
 *            }
 *         }
 *      },
 *             "tags": [ "Proyect" ],
 *            "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "Proyect has been created"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
proyectRouter.post(
  '/',
  authMiddleware.isAdmin,
  validateMiddleware.validateProyect,
  proyectController.create
);

/**
 * @swagger
 *{
 *    "/proyects/{id}": {
 *       "post": {
 *             "summary": "Update a Proyect by id, owned User is require",
 *             "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "The id of the Proyect",
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
 *                "$ref": "#/components/schemas/Proyect"
 *                }
 *            }
 *         }
 *      },
 *             "tags": [ "Proyect" ],
 *             "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "Proyect has been Update"
 *                 },
 *                 "404": {
 *                   "description": "Proyect not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
proyectRouter.post(
  '/:id',
  authMiddleware.isOwnProyect,
  validateMiddleware.validateProyect,
  proyectController.update
);

/**
 * @swagger
 *{
 *    "/proyects/{id}/assing": {
 *       "post": {
 *             "summary": "Update a Proyect by id, owned User is require",
 *             "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "The id of the Proyect",
 *                 "required": true,
 *                 "type": "integer"
 *               },
 *             ],
 *       "requestBody": {
 *        "content": {
 *           "application/json": {
 *              "schema": {
 *                "type": "object",
 *                 "example":{
 *                  "email":"prueba2@gmail.com"
 *                  }
 *                }
 *            }
 *         }
 *      },
 *             "tags": [ "Proyect" ],
 *             "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "Assing has been complete"
 *                 },
 *                 "404": {
 *                   "description": "Proyect not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
proyectRouter.post(
  '/:id/assing/',
  authMiddleware.isOwnProyect,
  validateMiddleware.validateAssingProyect,
  proyectController.assing
);

/**
 * @swagger
 *{
 *    "/proyects/{id}": {
 *       "delete": {
 *             "summary": "Delete a Proyec by id",
 *             "parameters": [
 *               {
 *                 "name": "id",
 *                 "in": "path",
 *                 "description": "The id of the Proyect",
 *                 "required": true,
 *                 "type": "integer"
 *              }
 *             ],
 *             "tags": [ "Proyect" ],
 *             "security":[{"token":[]}],
 *             "responses": {
 *                 "200": {
 *                    "description": "Proyect has been Delete"
 *                 },
 *                 "404": {
 *                   "description": "Proyect not found"
 *                 },
 *                 "500": {
 *                   "description": "Internal server error"
 *                 }
 *              }
 *          }
 *      }
 *   }
 */
proyectRouter.delete(
  '/:id',
  authMiddleware.isOwnProyect,
  proyectController.remove
);

module.exports = proyectRouter;
