const router = require('express').Router();
const swaggerui = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/api-docs', swaggerui.serve);
router.get('/api-docs', swaggerui.setup(swaggerDocument));