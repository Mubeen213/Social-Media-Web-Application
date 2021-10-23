const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial-practise');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to the db'));

db.once('open',function(){
  console.log('Succesfully connected to mongodb');
});

module.exports = db;