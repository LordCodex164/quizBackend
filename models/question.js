const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    prompt: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: String,
      required: true
    }
  });

  module.exports = mongoose.model("question", questionSchema)