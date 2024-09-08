const jwt = require("jsonwebtoken")
const { createCustomError } = require("../errors/custom-error")


const isAuth = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        next(createCustomError("Not Authorized to access the route", 402))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log("falied to run")
        res.status(401).json({msg: "Not Authorized to access the route"})
        next(createCustomError("Not Authorized to access the route", 401))
    }
}

module.exports = {
    isAuth
}