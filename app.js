const express  = require('express')
const app = express()
const quiz = require("./routes/quiz")
const connectDB = require("./db/connect")
const port = 3000
const cors = require("cors")
const question = require("./routes/question")
require("dotenv").config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
//using our quiz api
app.use("/api/v1/quiz", quiz)
//using our questions api as a middleware
app.use("/api/v1/quiz/questions", question)

//starting the connection

const start = async () => {
  try {
    const connection = await connectDB(process.env.MONGO_URL)
  if(connection){
    app.listen(process.env.PORT || port, () => {
    console.log(`port is listening on port ${port}`)
})
  }
  } catch (error) {
    console.log(error)
  }
  
}
start()

