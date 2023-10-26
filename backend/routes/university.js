const express = require('express');
const universityController = require('../controllers/universities');
const routes = express.Router();

routes.get('/getAllUniversities', universityController.getAllUniversities);
routes.get('/getUniversity/:category', universityController.getCategoriesWiseUni);
routes.get('/topUniversities', universityController.getTopUniversities);
routes.post('/add', universityController.addUni);
routes.put('/update/:id', universityController.updateUni);
routes.delete('/delete/:id', universityController.deleteUni);
module.exports = routes;