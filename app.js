const express = require('express');
var app = express();

app.set("view engine", "ejs");

// Landing Page Route
app.get("/", function(req, res) {
  res.render("landing");
});

// Camp Grounds
app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
    {name: "Eisner Camp", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg"}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
});

// Listen
app.listen(3000, function() {
  console.log("Yelp Camp is on 3000");
});
