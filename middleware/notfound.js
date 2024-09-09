//create a notfound middleware
const { BadRequestError } = require("../errors/badRequest")

const notFound = (req, res) => {
    res.status(404).send("Route does not exist")
}

module.exports = notFound