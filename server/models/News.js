const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String },
  date: { type: Date, default: Date.now },
  link: { type: String },
  image: { type: String },
});

module.exports = mongoose.model('News', newsSchema);