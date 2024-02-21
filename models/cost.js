//Define Mongoose schemas and models for cost
const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
  user_id: Number,
  year: Number,
  month: Number,
  day: Number,
  description: String,
  category: String,
  sum: Number,
});

module.exports = mongoose.model('Cost', costSchema);
