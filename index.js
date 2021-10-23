
const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets'));

const db = require('./config/mongoose');

//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo')(session);

//setting up saas middleware
const saasMiddleware = require('node-sass-middleware');
app.use(saasMiddleware({

  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'expanded',
  prefix:'/css'
}));

app.use(express.urlencoded());
const cookieParser = require('cookie-parser');

// include the views folder
app.set('view engine','ejs');
app.set('views','./views');

// Mongo store is used to store the session cookie in the db
app.use(session({

  name:'codeial',
  secret:'Secret',
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge :(1000*60*100)
  },
  store:new MongoStore(
    {
    mongooseConnection:db,
    autoRemove : 'disabled'
    },
     function(err){
       console.log(err ||'Connect-mongo setupok')
     }
  )
}));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){

  if(err){
    console.log(`Error in running up the server at port : ${err}`);
  }

  console.log(`Server up at port : ${port}`);
})