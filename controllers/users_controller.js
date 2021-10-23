
// import user here
const User = require('../models/user');

module.exports.profile = function(req, res){
   return res.render('user_profile', {
       title: 'User Profile'
   });
}


// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

   return res.render('user_sign_up', {
       title: "Codeial | Sign Up"
   });
}


// render the sign in page
module.exports.signIn = function(req, res){
   
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }


   return res.render('user_sign_in', {
       title: "Codeial | Sign In"
   })
}

// create a user

module.exports.create = function(req,res){

    // check if the passwod and confirm password mathces
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    // find if the user exists already
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding the user');return;
        }

        // if the user doesnt exist than create

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in finding the user');return;
                }
                
                return res.redirect('/users/sign-in');
            });
        }
        //else the user already exist redirect to sign in page

    else{
        return res.redirect('/users/sign-in');
    }
    });
}

// sign in and create a session for user
// The strategy to verify credentials is written in passport-local-strategy

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

// removing the session
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}