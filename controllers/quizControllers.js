const Quiz = require("../models/Quiz")


const getAllQuiz = async (req, res) => {
    const allTasks = await Quiz.find({})
    res.status(200).json({allTasks})
}  

const createQuiz = async (req, res) => {
 console.log(req.body)
  try {
    const createdTask = await Quiz.create(req.body)
 console.log(createdTask)
 res.status(200).json(createdTask)
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
 
}

const getQuiz = async (req, res) => {
   
    try {
         const {id: QuizId} = req.params
         console.log(QuizId)
        const singleQuizWithId = await Quiz.findById({_id: QuizId})
        if(!singleQuizWithId){
            return res.status(404).json({msg: `task not found with id ${TaskId}`})
       }
       res.status(200).json({singleQuizWithId})
       } catch (error) {
         console.log(error)
         res.status(500).json({msg: error})
      }
}

const updateQuiz = async (req, res) => {
    try {
      const {id: TaskId} = req.params
      const task = await Quiz.findByIdAndUpdate({_id: TaskId}, req.body, {
        new: true,
        runValidators: true
      })
      console.log(task)
      if(!task){
        return res.status(404).json({msg: `task not found with id ${TaskId}`})
      }
      res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
    
}

const deleteQuiz = async (req, res) => {
    try {
     const {id: TaskId} = req.params
    const task = await Quiz.findByIdAndDelete({_id: TaskId})
    if(!task) {
        return res.status(404).json({msg: `data not found with ${TaskId}`})
    }
    res.status(200).json([task, {msg: 'successfully deleted'}])
    } catch (error) {
         res.status(500).json({msg: error})
    }
}



module.exports = {
    getAllQuiz,
    createQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz
}