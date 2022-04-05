const mongoose = require("mongoose")

//create a database structure (Schema) using mongoose to define your database collection
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must include a valid name"],
    trim: true,
    maxLength: [20, "name cannot be more than 20 characters"]
  },
  completed: {
    type: Boolean,
    default: false
  }
})

//to use the schema, it needs to be converted into a model
//Models are responsible for creating and reading documents (database record) from the underlying MongoDB database
module.exports = mongoose.model("Task", TaskSchema)
