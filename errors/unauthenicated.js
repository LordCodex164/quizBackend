const {StatusCodes} = require("http-status-codes")
const {CustomApiError} = require("../errors/custom-error")

class UnAuthenticatedError extends CustomApiError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthenticatedError