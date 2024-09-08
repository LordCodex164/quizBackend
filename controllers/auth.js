const jwt = require("jsonwebtoken")

const { createCustomError } = require("../errors/custom-error")

const asyncWrapper = require("../middleware/asyncwrapper")

const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        next(createCustomError("Please enter your details", 402))
    }
    try {
       const token = await jwt.sign({email, password}, process.env.JWT_SECRET, {expiresIn: "1h"})
       res.status(200).json({msg: "signed in successfully", token: `here is your token ${token}`}) 
    } catch (error) {
      next(createCustomError("Not Authorized to access the route", 402))
    }
})

const dashboard = asyncWrapper(async (req, res, next) => {
    res.status(200).json({msg: "Welcome to the dashboard"})
})

module.exports = {
    login,
    dashboard
}