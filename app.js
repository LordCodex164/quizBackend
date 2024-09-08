const express  = require('express')
const app = express()
const connectDB = require("./db/connect")
const port = 3000
const cors = require("cors")
const quiz = require("./routes/quiz")
const question = require("./routes/question")
const login = require("./routes/auth")
const notFound = require("./middleware/notfound")
const dashboard = require("./routes/dashboard")
const errorHandlerMiddleware = require("./middleware/error-handler")
require("dotenv").config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
//using our quiz api
//using our questions api as a middleware
app.use("/api/v1/questions", question)
app.use("/api/v1/quiz", quiz)
app.use("/api/v1/auth", login)
app.use("/api/v1/dashboard", dashboard)
app.use(notFound)
//app.use(errorHandlerMiddleware)
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
  }}
start()

