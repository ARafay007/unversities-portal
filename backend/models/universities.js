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
  province: {
    type: String,
    enum: ['Sindh', 'Punjab', 'KPK', 'Balochistan'],
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
  programs: [{
    fee: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    discipline: {
      type: String,
      required: true,
    },
  }],
  adminssionOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  scholarship: {
    type: Boolean,
    requried: true,
    default: false,
  },
  universityLink: String,
  image: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

exports.universityModel = mongoose.model('Universites', universitySchema);