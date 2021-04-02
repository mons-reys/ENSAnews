const Auth = require('../models/auth/auth');
const bcrypt = require('bcrypt');
const { render } = require('ejs');








//login
const login = (req, res) =>{
    //is empty check 
    const isEmpty = (obj) => {
        return Object.keys(obj).length 
    }
    if(isEmpty(req.body) == 0){
       res.render('./admin/auth/login', {msg: ''}); 
    } else {
        const user = req.body;
        Auth.find({
            username: user.username
        }).then(result =>{
            console.log('exist');
        }).catch(err => console.log(err));
    }
    
}

const logged = async (req, res) =>{
    const user = req.body;
        Auth.find({
            username: user.username
        })
        .then(result =>{
            if(result.length == 0){
                const message = 'username or password incorrect'
                res.render('./admin/auth/login', {msg: message});
            }else{
              return result  
            }
        })
        .then(data => {
            //check the password
            const password = data[0].password;
            bcrypt.compare(user.password, password).then(function(result) {
                if(result){
                    res.redirect('/admin');
                }else{
                    const message = 'username or password incorrect'
                    res.redirect('/admin/login', {msg: message});
                }
            });
        })
        .catch(err => console.log(err));
}

//register
const register = (req, res) =>{
    res.render('./admin/auth/register');
}

const user_create_post = async (req, res) =>{
    try{
        //hash the passowrd
        const  user = await bcrypt.hash(req.body.password, 10)
            .then(result =>{
                return result
            })
            .then(data => {
                const user = {
                    username: req.body.username,
                    email: req.body.email,
                    university: req.body.university,
                    password: data
                } 
                return user;
            })
            .catch(err => console.log(err))

            console.log(user);
            //save the data
            const auth = new Auth(user);
            auth.save()
                .then(result => res.redirect('login'))
                .catch(err => console.log(err));
        
    }catch{
        res.redirect('404');
    }
    
    

   
}
module.exports = {
    login,
    register,
    user_create_post,
    logged
}