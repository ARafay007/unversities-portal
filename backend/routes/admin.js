const express = require('express');
const AdminController = require('../controllers/admin');
const routes = express.Router();

routes.post('/create', AdminController.createAdmin);
routes.post('/login', AdminController.loginAdmin);

module.exports = routes;