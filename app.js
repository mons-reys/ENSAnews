const express = require('express');

const app = express();

//listen for a request 
app.listen(3000);

//middleware and static files
app.use(express.static('public'));

/* app.use((req, res, next) => {
    console.log('try middlewares');
    next();
}) */

//set the ejs view engine
app.set('view engine', 'ejs');

//responsre to a request 
app.get('/', (req, res) =>{
    res.render('index');
});
app.get('/services', (req, res) =>{
    res.render('services');
});
app.get('/post', (req, res) =>{
    res.render('post');
});
app.get('/about', (req, res) =>{
    res.render('about');
});
app.get('/blogs/create', (req, res) =>{
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
})