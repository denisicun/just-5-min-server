
var mongoose = require("mongoose");

// schema setup
var exerciseSchema = new mongoose.Schema({
  userName: String,
  exercises: [
    {
      letter: String,
      exerciseDesc: String,
      exercisePic: String,
      reps: Number
    }
  ]
});

// model set up
module.exports = mongoose.model("Exercise", exerciseSchema);
