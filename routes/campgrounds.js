const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');

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
router.post("/campgrounds", function (req, res) {
    // get data from form and add to campground array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name, image, description };

    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW
router.get("/campgrounds/new", (req, res) => {
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

module.exports = router;