const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  education: String,
  category: {
    type: String,
    enum: ['Medical', 'Engineering', 'Business', 'Arts'],
    // required: true,
  },
});

exports.studentModel = mongoose.model('Students', studentSchema);