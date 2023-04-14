const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "pls provide a name"],
        trim: true,
        maxLength: [20, "the characters must not be more than 20 characters long"]
    },
    description: {
            type: String,
            required: [true, "pls provide a name"],
            trim: true,
            maxLength: [100, "the characters must not be more than 100 characters long"]
    },
    points: {
          type: Number,
          required: [true, "must provide a number"],
          maxLength: [2, "Provide a number in two digits"]
    },
    timeLimit: { 
                type: Number, 
                required: true,
                default: 1,
              },
      questions: [
                {
                  prompt: { type: String, required: true },
                  options: [{ type: String, required: true }],
                  correctAnswer: { type: String, required: true }
                }
              ]
            
      
})

module.exports = mongoose.model("quiz", quizSchema)
