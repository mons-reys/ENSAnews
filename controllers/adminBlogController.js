const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const moment = require('moment');

//blog_delete
const blog_delete = (redirecPath, req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findByIdAndDelete(id)
        .then(result =>{
            res.json({
                redirect: redirecPath
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


//
module.exports = {
    blog_delete,
    blog_create_get,
    blog_create_post
}