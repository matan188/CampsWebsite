const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

//  INDEX - Page Route
router.get("/", function (req, res) {
    res.render("landing");
});

// ===========
// AUTH ROUTES
// ===========
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    var newUser = { username: req.body.username };
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/campgrounds');
        });
    });
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

// Login logic
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function (req, res) {
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

module.exports = router;
