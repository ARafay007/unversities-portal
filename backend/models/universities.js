const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Medical', 'Engineering', 'Business', 'Arts', 'General'],
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  ranking: {
    type: Number,
    required: true,
  },
  fee: [{
    type: Number,
    required: true,
  }],
  courses: [{
    type: String,
    required: true,
  }],
  image: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

exports.universityModel = mongoose.model('Universites', universitySchema);