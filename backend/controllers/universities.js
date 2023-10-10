const {universityModel} = require('../models/universities');
const { catchAsync } = require('../util/catchAsync');

class University{
  getCategoriesWiseUni = catchAsync(async (req, res) => {
    const {category} = req.params;
    const {id, province} = req.query;
    let universities;
    if(id !== 'undefined') universities = await universityModel.find({category, _id: id, isActive: true});
    else if(province !== 'undefined') universities = await universityModel.find({category, province, isActive: true});
    else universities = await universityModel.find({category, isActive: true});

    res.status(200).json({data: universities});
  });

  addUni = catchAsync(async (req, res) => {
    const {name, category, province, about, ranking, fee, courses, image} = req.body;
    
    await universityModel.create({name, category, province, about, ranking, fee, courses, image});
    res.status(200).json({data: 'University has been added'});
  });

  updateUni = catchAsync(async (req, res) => {
    const {name, category, province, about, ranking, fee, courses, image, isActive} = req.body;
    const data = await universityModel.findOneAndUpdate({_id: req.params.id}, {name, category, province, about, ranking, fee, courses, image, isActive}, {new: true})
    res.status(200).json(data);
  });

  deleteUni = catchAsync(async (req, res) => {
    const data = await universityModel.findOneAndUpdate({_id: req.params.id}, {isActive: false}, {new: true});
    res.status(200).json({data});
  });
}

module.exports = new University();