const express = require("express")
const router = express.Router()
const {
    getAllQuestions, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion
} = require("../controllers/questionController")

router.route("/").get(getAllQuestions)
router.route("/:id").post(createQuestion).patch(updateQuestion).delete(deleteQuestion)

module.exports = router