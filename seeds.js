const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

var data = [
    {
        name: "Cat",
        image: "https://cdn.pixabay.com/photo/2017/03/14/14/49/cat-2143332__340.jpg",
        description: "This is a funky cat"
    }, {
        name: "Orange",
        image: "https://cdn.pixabay.com/photo/2017/01/20/15/12/orange-1995079__340.jpg",
        description: "This is a juicy orange"
    }, {
        name: "Idea",
        image: "https://cdn.pixabay.com/photo/2017/03/07/13/02/thought-2123970__340.jpg",
        description: "Good idea"
}];

function seedDB() {

    // Using Promises - Got a problem for adding comments
    // Campground.remove({}).then((itemsRemoved) => {
    //     console.log("Removed campgrounds: ", itemsRemoved.result.n);
    //     return Campground.insertMany(data); // Reinsert after removing
    // }).then((itemsInserted) => {
    //     console.log("# of items inserted: ", itemsInserted.length);
    // }).catch((err) => {
    //     console.log("Error with DB seeds");
    //     console.log(err);
    // });

    // Remove all campgrounds
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        // // console.log("Campgrounds remove");
        // // Add campgrounds 
        // data.forEach(function (seed) {
        //     Campground.create(seed, function (err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } 
        //         else {
        //             // console.log("added campground");
        //             // add comments
        //             Comment.create(
        //                 {
        //                     text: 'cool post', 
        //                     author: 'anonymous author'
        //                 }, function(err, comment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         // console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;