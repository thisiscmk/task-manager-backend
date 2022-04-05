//import the mongoose model which defines the schema
const Task = require("../models/task")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")

//logic to retrieve all tasks from database
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks: tasks, length: tasks.length })
})

//create a new document (record) using model's create method
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

//retrieve a single specific task
const getTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id
  const task = await Task.findOne({ _id: taskID })
  //if id does not exist
  if (!task) {
    return next(createCustomError(`No task exists with ID: ${taskID}`, 404))
  }
  //if it exists
  res.status(200).json({ task })
})

//update an existing task
const updateTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })
  if (!task) {
    return next(createCustomError(`No task exists with ID: ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

//delete a specific task
const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task exists with ID: ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

//export controller functions
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }
