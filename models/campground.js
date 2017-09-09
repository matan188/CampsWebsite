const mongoose = require('mongoose');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String, 
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

module.exports = {Campground};