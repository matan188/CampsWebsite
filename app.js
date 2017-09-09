const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground')
const Comment = require('./models/comment')
const seedDb = require('./seeds.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
seedDb();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


//** APP ROUTES **//
//  INDEX - Page Route
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
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
  res.render('campgrounds/new');
})


// SHOW - shows information about campground
app.get("/campgrounds/:id", function (req, res) {
  var id = req.params.id;
  
  Campground.findById(id).populate('comments').exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
})

// ==================
// COMMENTS ROUTES
// ==================
// NEW 
app.get('/campgrounds/:id/comments/new', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('./comments/new', {campground});
    }
  });
});

// POST route
app.post('/campgrounds/:id/comments', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});



// Listen
app.listen(3000, function() {
  console.log("Yelp Camp is on 3000");
});
