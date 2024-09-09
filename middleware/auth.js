const jwt = require("jsonwebtoken")
const unAuthenticatedError = require("../errors/unauthenicated")

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    if(!token){
        throw new unAuthenticatedError("Not authorized to access the route")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        throw new unAuthenticatedError("Not authorized to access the route")
    }
}

module.exports = {
    isAuth
}