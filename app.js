const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDb = require('./seeds.js');
const User = require('./models/user');
const campgroundRoutes = require('./routes/campgrounds');
const commentsRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
// seedDb();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// PASSPORT SETUP
app.use(require('express-session')({
  secret: "don't tell anybody",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentsRoutes);

// Listen
app.listen(3000, function() {
  console.log("Yelp Camp is on 3000");
});
