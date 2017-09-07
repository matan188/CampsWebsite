const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
var campgroundSchema = new mongoose.Schema({
  name: String, 
  image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Landing Page Route
app.get("/", function(req, res) {
  res.render("landing");
});

// Camp Grounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from db 
  Campground.find({}, function (err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  })
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to campground array
  // redirect back to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name, image};
  
  Campground.create(newCampground, function (err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
  
});

app.get("/campgrounds/new", (req, res) => {
  res.render('new');
})

// Listen
app.listen(3000, function() {
  console.log("Yelp Camp is on 3000");
});
