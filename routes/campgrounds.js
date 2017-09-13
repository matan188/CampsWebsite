const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');
var middleware = require('../middleware');

// Campgrounds
router.get("/campgrounds", function (req, res) {
    // Get all campgrounds from db 
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// CREATE
router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campground array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = { id: req.user._id, username: req.user.username };
    var newCampground = { name, image, description, author };

    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW
router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});


// SHOW - shows information about campground
router.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id;

    Campground.findById(id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', { campground: foundCampground });
        }
    });
});

// EDIT route
router.get('/campgrounds/:id/edit', middleware.isLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err){
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

// UPDATE route
router.put('/campgrounds/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    }); 
});

// DESTROY route
router.delete('/campgrounds/:id', middleware.isLoggedIn, middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, removedCampground) => {
       if (err) {
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds');
       }
    });
});

module.exports = router;