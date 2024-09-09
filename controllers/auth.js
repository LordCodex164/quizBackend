const jwt = require("jsonwebtoken")
const BadRequestError = require("../errors/badRequest")
const asyncWrapper = require("../middleware/asyncwrapper")

const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    try {
       const token = jwt.sign({email, password}, process.env.JWT_SECRET, {expiresIn: "1h"})
       res.status(200).json({msg: "signed in successfully", token: `here is your token ${token}`}) 
    } catch (error) {
      throw new unAuthenticatedError("Failed to sign in")
    }
})

const dashboard = asyncWrapper(async (req, res, next) => {
    res.status(200).json({msg: "Welcome to the dashboard"})
})

module.exports = {
    login,
    dashboard
}