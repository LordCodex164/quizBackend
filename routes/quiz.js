const express = require("express")
const router = express.Router()
const {
    getAllQuiz, 
    getQuiz, 
    createQuiz, 
    updateQuiz, 
    deleteQuiz
} = require("../controllers/quizControllers")

router.route("/").get(getAllQuiz).post(createQuiz)
router.route("/:id").get(getQuiz).patch(updateQuiz).delete(deleteQuiz)

module.exports = router