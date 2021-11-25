const express = require('express');
const morgan = require('morgan');
const path = require('path');
const slash = require('express-slash');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition.json');
require('dotenv').config();

const proyectRouter = require('./routes/proyect');
const usersRouter = require('./routes/users');

// Set up express app
const app = express();

app.use(morgan('dev'));
app.use(express.json());

//swagger
const options = {
  swaggerDefinition,
  apis: [`${path.join(__dirname, 'routes', '*.js')}`]
};
const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//router.
app.use('/proyects', proyectRouter);
app.use('/users', usersRouter);

app.use(slash());

//port
const port = parseInt(process.env.PORT) || 8000;
app.set('port', port);
app.listen(port, () => console.log('app listening in port: ' + port));

module.exports = app;
