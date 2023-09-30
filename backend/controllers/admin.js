const bcrypt = require('bcrypt');
const {adminModal} = require('../models/admin');
const {catchAsync} = require('../util/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../util/AppError');

class Admin{
  createAdmin = catchAsync(async (req, res) => {
    const {name, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 12);

    await adminModal.create({name, email, password: hashPassword});
    res.status(200).json({data: 'Admin has been created'});
  });

  loginAdmin = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) throw new AppError('Email and password are required', 400);

    const adminData = await adminModal.find({email}).select('+password');
    const isPasswordMatch = await bcrypt.compare(password, adminData[0].password);

    if(!adminData || !isPasswordMatch) throw new AppError('Email or password is incorrect.', 400);

    jwt.sign({id: adminData[0]._id}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES }, (err, token) => {
      if(err) throw new AppError(err, 400);

      res.status(200).json({
        data: {
          token,
          id: adminData[0].id,
          name: adminData.name,
        }
      });
    });
  });
}

module.exports = new Admin();