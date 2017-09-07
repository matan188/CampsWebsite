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
  image: String,
  description: String
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
      res.render("index", {campgrounds: allCampgrounds});
    }
  })
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to campground array
  // redirect back to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name, image, description};
  
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

app.get("/campgrounds/:id", function (req, res) {
  var id = req.params.id;
  
  Campground.findById(id, function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('show', {campground: foundCampground});
    }
  });
})

// Listen
app.listen(3000, function() {
  console.log("Yelp Camp is on 3000");
});
