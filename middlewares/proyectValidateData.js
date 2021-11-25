const { check, validationResult } = require('express-validator');

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const validateProyect = [
  check('name')
    .notEmpty()
    .withMessage('You need to enter a Name!')
    .bail()
    .withMessage('Invalid Name')
    .bail(),

  check('description')
    .notEmpty()
    .withMessage('You need to enter a description')
    .bail()
    .isAlphanumeric()
    .withMessage('Invalid Description')
    .bail(),

  check('assignedTo')
    .notEmpty()
    .withMessage('You need to enter a body!')
    .bail()
    .isNumeric()
    .withMessage('invalid Assigned User Id')
    .bail(),

  check('status').notEmpty().withMessage('You need to enter a status!').bail(),

  errorHandler
];

const validateAssingProyect = [
  check('email')
    .notEmpty()
    .withMessage('You need to enter a valid Email!')
    .bail()
    .isEmail()
    .withMessage('Invalid Email')
    .bail(),

  errorHandler
];

module.exports = { validateProyect, validateAssingProyect };
