const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const studentModel = require('../models/student');
const {catchAsync} = require('../util/catchAsync');
const AppError = require('../util/AppError');

class Student{
  createAccount = catchAsync(async (req, res) => {
    const {name, email, password, education, category} = req.body;

    const hashPassword = await bcrypt.hash(password, 8);

    await studentModel.create({name, email, hashPassword, education, category});
    res.status(200).json({data: 'Account has been created'});
  });

  login = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) throw new AppError('Email and password are required.', 400);

    const student = await studentModel.find({email}).select('+password');

    const checkPassword = await bcrypt.compare(password, student[0].password);

    if(!student || !checkPassword) throw new AppError('Email or password is incorrect!', 404);

    jwt.sign({id: student[0]._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES}, (err, token) => {
      if(err) throw new AppError(err, 400);

      res.status(200).json({
        data: {
          token,
          id: student[0].id,
          name: student[0].name,
          email: student[0].email
        }
      });
    })
  });
}

module.exports = new Student();