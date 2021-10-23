
// import user
const User = require('../models/user');

// import passport
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Authenticating the user using passport js

passport.use(new LocalStrategy({
  usernameField:'email'
},
function(email,password,done){ 

      User.findOne({email:email},function(err,user){
        if(err){
          console.log('Error in finding user');
          return done(null);
        }

        if(!user || user.password!=password){
          console.log('Invalid user name or password');
          return done(null,false);
        }
        // if it is a valid user then return true to
        return done(null,user);
      });

    }
));

// serialize the user and create actual session
passport.serializeUser(function(user,done){
  done(null,user.id);
});

// deserialize the user 
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    if(err){
      console.log('Error in finding the user');
      return done(err);
    }
    return done(null,user);
  });
});

// sending data to views
// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){

  if(req.isAuthenticated()){
    return next();
  }
  //if user is not signed in
  return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
   // req.user contains the current signed in user from the session
   //cookie and we are just sending this to locals for views
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;