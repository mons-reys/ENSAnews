const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const moment = require('moment');

router.get('/details/:id', (req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findById(id)
        .then(result =>{
            //fetch the comments 
            Comment.find({blogId: id}).sort({createdAt: -1})
                    .then(commentsResult =>{
                        res.render('blog', {blog: result, comments: commentsResult, moment });
                    })
            
        })
        .catch(err => console.log(err));
});


router.get('/create', (req, res) =>{
    res.render('create');
});


//handle the comments
router.post('/details/:id', (req, res) =>{
    const commentToSave = {blogId: req.params.id, ...req.body}
    const comment = new Comment(commentToSave);
    comment.save()
           .then(result =>{
               res.redirect('/blog/details/' + req.params.id);
           })
           .catch(err => console.log(err));
 });


 module.exports = router;