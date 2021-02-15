const Blog = require('../models/blog');

//index page controller
const blog_index = (collection, view, req, res) =>{
    //-1: from the newest to the oldest
    collection.find().sort({createdAt: -1})
    .then(result => {
        res.render(view, {blogs: result});
    }).catch(err => console.log(err));
}

//

module.exports = {
    blog_index
}