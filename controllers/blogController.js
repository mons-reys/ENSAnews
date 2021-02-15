const Blog = require('../models/blog');
const Comment = require('../models/comment');
const moment = require('moment');

//index page controller
const blog_index = (collection, view, req, res) =>{
    //-1: from the newest to the oldest
    collection.find().sort({createdAt: -1})
    .then(result => {
        res.render(view, {blogs: result});
    }).catch(err => console.log(err));
}

//details blog controller
const blog_details = (viewPath ,req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findById(id)
        .then(result =>{
            //fetch the comments 
            Comment.find({blogId: id}).sort({createdAt: -1})
                    .then(commentsResult =>{
                        res.render(viewPath, {blog: result, comments: commentsResult, moment });
                    })
            
        })
        .catch(err => console.log(err));
}


//blog's comment post controller
const blog_comment_post = (req, res) =>{
    const commentToSave = {blogId: req.params.id, ...req.body}
    const comment = new Comment(commentToSave);
    comment.save()
           .then(result =>{
               res.redirect('/blog/details/' + req.params.id);
           })
           .catch(err => console.log(err));
}

//
module.exports = {
    blog_index,
    blog_details,
    blog_comment_post
}