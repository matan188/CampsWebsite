const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');
const Comment = require('../models/comment');


// NEW route
router.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('./comments/new', { campground });
        }
    });
});

// POST route
router.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT comments
router.get('/campgrounds/:id/comments/:commentId/edit', (req, res) => {
    Comment.findById(req.params.commentId, (err, foundComment) => {
        if (err) {
            res.redirect('/campgrounds/' + req.params.id);
        }
        res.render('comments/edit', {campgroundId: req.params.id, comment: foundComment}); 
    });
});

// UPDATE comments
router.put('/campgrounds/:id/comments/:commentId', (req, res) => {
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, foundComment) => {
       if (err) {
           res.redirect('/campgrounds/' + req.params.id);
       } else {
           res.redirect('/campgrounds/' + req.params.id);       
       }
   }); 
});

// DESTROY comments
router.delete('/campgrounds/:id/comments/:commentId', (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if (err) {
            res.redirect('back');
        } else {
            Campground.findByIdAndUpdate(req.params.id, {
                $pull: {
                    comments: req.params.commentId
                }
            }, (err) => {
              if (err) {
                  console.log("Couldn't remove comment from campground object", err);
              } else {
                  res.redirect('/campgrounds/' + req.params.id);
              }
            });
        }
    });  
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
