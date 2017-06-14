// ==============================
//          requires
// ==============================
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose= require("mongoose");
var methodOverride   = require("method-override");

// ==============================
//          models
// ==============================
var Exercise = require('./models/exercise');
var Letter   = require('./models/letter');

// ==============================
//         seed data
// ==============================
var letters = require('./public/letterToExc');

// ==============================
//         settings
// ==============================
mongoose.connect("mongodb://denis:123456@ds127492.mlab.com:27492/just-5-min");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// ==============================
//          routes
// ==============================
app.get('/',(req, res) => {
  // var a = req.body.name;
  res.send('hey');
});

app.get('/seedDB',(req, res) => {

  letters.forEach((letter) => {
    Letter.create(letter, (err, newLetter) => {
      if(err){
        console.log(err);
      } else {
        console.log(newLetter);
      }
    });
  });

  res.send('Done!');

});

app.get('/exerciesForName/:name',(req, res) => {
  var finalRes = {};

  var name = req.params.name.split('');
  console.log(name);
  var resOBJ = {userName:'', exercises:[]};

  resOBJ.userName = name;
  //var curLetter = {};

  // for (var i = 0; i < name.length; i++) {
    Letter.find({ 'letter':{$in: name}}).then(letterFromDB => {
      if(!letterFromDB){
        console.log(err);
      } else {
        console.log(letterFromDB);
        resOBJ.exercises.push(letterFromDB);
        //console.log(i);
        res.send(resOBJ);

        // we are in the last one, now we create the exercise
        // if (i == name.length - 1) {
        //   Exercise.create(resOBJ,(err, newExer) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       res.send(resOBJ);
        //     }
        //   });
        // }
      }
    });
  }//}
);

// ==============================
// listener
// ==============================
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('we are up!');
});
