const Quiz = require("../models/Quiz")
const asyncWrapper = require("../middleware/asyncwrapper")
const {createCustomError} = require("../errors/custom-error")

const getAllQuiz = asyncWrapper( async (req, res) => {
   
   const {name, sort, numericFilters} = req.query;

   const queryObject = {};

   if(name) {
        queryObject.name = {$regex: name, $options: 'i'}        
   }

   //first finding them from the db and get them as a result 
   // then we check for any query if it means sorting and all
   // before we return them as sorted values after they are successfully fetched

   const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eqe"
     }

   if(numericFilters) {
    console.log("numericFilters", numericFilters)
   }

   const reGex = /\b(<|>|>=|=|<|<=)\b/g

   let filters = numericFilters.replace(reGex, (match) => {
    console.log("match", `${operatorMap[match]}`)
    return `-${operatorMap[match]}-`
   })

   const options = ["points", "timeLimit"]
   filters = filters.split(",").forEach((item) => {
      console.log("item", item)
      const [field, operator, value] = item.split("-")
      if(options.includes(field)){
        queryObject[field] = {[operator]: Number(value)}
      }
   })

   console.log("queryObject", queryObject)

   console.log("numericFilters", numericFilters)
   console.log("filters", filters)

   let results = Quiz.find(queryObject)
   let sortedQuiz;

   if(sort){
        const sortSplit = sort.split(",").join("")
        console.log("sortsplit", sortSplit)
        sortedQuiz = results.sort(sortSplit)
   }
   else {
    sortedQuiz = results.sort("createdBy")
   }

    const products = await sortedQuiz; 

    console.log("products", products);

    res.status(200).json({products, noOfTasks: products.length})

}) 

const createQuiz = asyncWrapper(async (req, res) => {
 console.log(req.body)
  const createdTask = await Quiz.create(req.body)
 console.log(createdTask)
 res.status(200).json(createdTask)
})

const getQuiz = asyncWrapper(async (req, res, next) => {
         const {id: QuizId} = req.params
         const {} = req.query
         console.log(req.query)
        const singleQuizWithId = await Quiz.findById({_id: QuizId})
        if(!singleQuizWithId){
          const error = new Error('Quiz not found')
          error.status = 404
          next(createCustomError(`task not found with id ${QuizId}`, 404))
           return next(error)
       }
       res.status(200).json({singleQuizWithId})
})

const updateQuiz = async (req, res) => {
    try {
      const {id: TaskId} = req.params
      const task = await Quiz.findByIdAndUpdate({_id: TaskId}, req.body, {
        new: true,
        runValidators: true
      })

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
    deleteQuiz,
}