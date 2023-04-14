const Question = require("../models/question")
const Quiz = require("../models/Quiz")

const getAllQuestions = async (req, res) => {
  try{
   const allQuestions = await Question.find({})
    res.status(200).json({allQuestions}) 
  } catch(error){
    console.log(error)
  }
    
}  

const createQuestion = async (req, res) => {
  const { id:quizId } = req.params;
  const { prompt, options, correctAnswer } = req.body;
  console.log(req.body)
  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
  
    const question = new Question({ prompt, options, correctAnswer })
    
    await question.save();
  
    quiz.questions.push(question)
    console.log(quiz)
    await quiz.save();
     console.log(question)
    res.status(201).json({question})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' })

  }
 
}

const getQuiz = async (req, res) => {
   
    try {
         const {id: QuestionId} = req.params
         console.log(TaskId)
        const singleQuestionWithId = await Quiz.findById({_id: QuestionId})
        if(!singleTaskWithId){
            return res.status(404).json({msg: `task not found with id ${QuestionId}`})
       }
       res.status(200).json({singleQuestionWithId})
       } catch (error) {
         console.log(error)
         res.status(500).json({error: error})
      }
}

const updateQuestion = async (req, res) => {
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

const deleteQuestion = async (req, res) => {
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
    getAllQuestions,
    createQuestion,
    getQuiz,
    updateQuestion,
    deleteQuestion
}