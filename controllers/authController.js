const Auth = require('../models/auth/auth');
const bcrypt = require('bcrypt');








//login
const login = (req, res) =>{
    //is empty check 
    const isEmpty = (obj) => {
        return Object.keys(obj).length 
    }
    
    
    if(isEmpty(req.body) == 0){
       res.render('./admin/auth/login'); 
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
                res.render('404');
            }else{
              return result  
            }
        })
        .then(date => {
            const checkPass = await bcrypt.compare(req.body.password, result.password);
                try{
                   if( checkPass){
                    console.log('true');
                    }
                }catch{
                    console.log('err');
                }
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