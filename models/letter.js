var mongoose = require("mongoose");

// schema setup
var letterSchema = new mongoose.Schema({
        letter: String,
        exerciseDesc: String,
        exercisePic: String,
        reps: Number
});

// model set up
module.exports = mongoose.model("Letter", letterSchema);
