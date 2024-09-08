const {CustomApiError} = require("../errors/custom-error")

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("error", err.message)
   if(err instanceof CustomApiError){
    return res.status(err.statusCode).json({msg: err.message})
   }
   return res.status(500).json({
    msg: err.message
  }); 
}

module.exports = errorHandlerMiddleware;