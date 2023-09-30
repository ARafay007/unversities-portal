const universityModel = require('../models/universities');
const { catchAsync } = require('../util/catchAsync');

class University{
  getCategoriesWiseUni = catchAsync(async (req, res) => {
    const {category} = req.body;
    const universities = await universityModel.find({category});
    res.status(200).json({data: universities});
  });

  addUni = catchAsync(async (req, res) => {
    const {name, category, about, ranking, fee, courses, image} = req.body;

    await universityModel.create({name, category, about, ranking, fee, courses, image});
    res.status(200).json({data: 'University has been added'});
  });

  updateUni = catchAsync(async (req, res) => {
    const {name, category, about, ranking, fee, courses, image, isActive} = req.body;
    const data = await universityModel.indOneAndUpdate({_id: req.params.id}, {name, category, about, ranking, fee, courses, image, isActive}, {new: true})
    res.status(200).json(data);
  });

  deleteUni = catchAsync(async (req, res) => {
    const data = await universityModel.findOneAndUpdate({_id: req.body.id}, {isActive: false}, {new: true});
    res.status(200).json({data});
  });
}

module.exports = new University();