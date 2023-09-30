const express = require('express');
const universityController = require('../controllers/universities');
const routes = express.Router();

routes.get('/getAll', universityController.getCategoriesWiseUni);
routes.post('/add', universityController.addUni);
routes.put('/update/:id', universityController.updateUni);
routes.delete('/delete/:id', universityController.deleteUni);
module.exports = routes;