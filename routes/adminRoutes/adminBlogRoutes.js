const express = require('express');
const router = express.Router();
const adminBlogController = require('../../controllers/adminBlogController');


//routes
//costume functions
//to delete a blog based on id and path 



//admin index model
router.get('/', adminBlogController.blog_index);

//create blog model
router.get('/createBlog',adminBlogController.blog_create_get);

//comments model
router.get('/blog/details/:id', adminBlogController.blog_details);

//delete comment
router.delete('/blog/details/:id/:comment_id', adminBlogController.comment_delete);

//delete blog
router.delete('/blog/details/:id', adminBlogController.blog_delete);




//add new blog
//multer config 
const multer = require('multer');
//destination
//const upload = multer({dest: 'uploads/'});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
})
//filter only the images 
const fileFilter = (req, file, cb) =>{
    //reject a file 
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpge' ){
        //accept the file cb: callback function
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/createBlog',  upload.single('img'), adminBlogController.blog_create_post);


 module.exports = router;