const express = require("express")
const router = express.Router()

//import controllers
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require("../controllers/tasks")

//create a base route for each controller function
router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

//both put and patch methods update, however put replaces every property of a record while patch only replaces the specified property
module.exports = router
