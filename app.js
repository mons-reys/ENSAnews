
const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes');
const app = express();
const adminRouter = require('./routes/adminRoutes/adminBlogRoutes');
const authRouter = require('./routes/adminRoutes/adminAuthRoutes');


//set the ejs view engine
app.set('view engine', 'ejs');

//connect to mongoDB
const dbURL = 'mongodb+srv://mons:rowrow2020@cluster0.tqs3m.mongodb.net/ensanews?retryWrites=true&w=majority';
mongoose.connect(dbURL, {
    useNewUrlParser: true,
  })
    .then((result) => {
        //listen for a request 
        app.listen(3000);
    })
    .catch(err => console.log(err));



//middleware and static files
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.urlencoded({extended: true}));



//handle the blogs
app.get('/services', (req, res) =>{
    res.render('services');
});

//blog router
app.use('/blog',blogRouter);

app.get('/about', (req, res) =>{
    res.render('about');
});




//auth
app.use('/admin', authRouter);
//admin route
app.use('/admin',adminRouter);
 

 //404 middleware
 app.use((req, res) => {
    res.status(404).render('404');
})
