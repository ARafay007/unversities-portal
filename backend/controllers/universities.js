'use strict';
const {universityModel} = require('../models/universities');
const {studentModel} = require('../models/student');
const { catchAsync } = require('../util/catchAsync');
const nodemailer = require('nodemailer');
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

  getTopUniversities = catchAsync(async (req, res) => {
    const data = await universityModel.find().sort({'ranking': 1}).limit(10);
    res.status(200).json({data});
  });

  addUni = catchAsync(async (req, res) => {
    const {name, category, province, about, ranking, programs, adminssionOpen, universityLink, image} = req.body;
    await universityModel.create({name, category, province, about, ranking, programs, adminssionOpen, universityLink, image});
    res.status(200).json({data: 'University has been added'});
  });

  updateUni = catchAsync(async (req, res) => {
    const {name, category, province, about, ranking, programs, adminssionOpen, universityLink, image, isActive} = req.body;
    const data = await universityModel.findOneAndUpdate({_id: req.params.id}, {name, category, province, about, ranking, programs, adminssionOpen, universityLink, image, isActive}, {new: true});

    if(adminssionOpen){
      const getStudentsEmail = await studentModel.find();

      const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // upgrade later with STARTTLS
        service: '',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        }
      });
      
      const mailOptions = {
        from: process.env.EMAIL,
        to: getStudentsEmail.map(std => std.email).join(', '),
        subject: `Admission are open in ${name} University`,
        html: `
          <h1>${name}</h1>
          <p>${universityLink}</p>
          <p><strong>
            For more information about university please click on this link http://localhost:3000/${category}/${req.params.id}
          </strong></p>
        `,
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  
    }

    res.status(200).json(data);
  });

  deleteUni = catchAsync(async (req, res) => {
    const data = await universityModel.findOneAndUpdate({_id: req.params.id}, {isActive: false}, {new: true});
    res.status(200).json({data});
  });
}

module.exports = new University();