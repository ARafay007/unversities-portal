const express = require('express');
const studentController = require('../controllers/student');
const routes = express.Router();

routes.post('/login', studentController.login);
routes.post('/createAccount', studentController.createAccount);
routes.post('/registerStudent', studentController.registerStudent);

module.exports = routes;