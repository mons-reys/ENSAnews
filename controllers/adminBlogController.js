const Blog = require('../models/blog');
const Comment = require('../models/comment');
const moment = require('moment');

//index page controller
const blog_index = (req, res) =>{
    //-1: from the newest to the oldest
    Blog.find().sort({createdAt: -1})
    .then(result => {
        res.render('./admin/admin', {blogs: result});
    }).catch(err => console.log(err));
}

//blog_delete
const blog_delete = ( req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findByIdAndDelete(id)
        .then(result =>{
            res.json({
                redirect: '/admin'
            })
        })
        .catch(err => console.log(err));
}

//blog_create_get
const blog_create_get = (req, res) =>{
    res.render('admin/createBlog');
}

//blog_create_post
const blog_create_post = (req, res) =>{
    const blogToSave = req.body
    const blog = new Blog(blogToSave);
    blog.save()
           .then(result =>{
               res.redirect('/admin');
           })
           .catch(err => console.log(err));
}


//details blog controller
const blog_details = (req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findById(id)
        .then(result =>{
            //fetch the comments 
            Comment.find({blogId: id}).sort({createdAt: -1})
                    .then(commentsResult =>{
                        res.render('admin/blog', {blog: result, comments: commentsResult, moment });
                    })
            
        })
        .catch(err => console.log(err));
}



//
module.exports = {
    blog_delete,
    blog_create_get,
    blog_create_post,
    blog_index,
    blog_details

}