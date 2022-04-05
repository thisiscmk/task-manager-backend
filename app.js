const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
const notFound = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandler")
//import the database connection file
const connectDB = require("./db/connect")
//import dotenv to load the .env file contents into process.env
require("dotenv").config()

//middleware
app.use(express.static("./public"))
app.use(express.json())

//base route
app.use("/api/v1/tasks", tasks)

//routes that don't exist
app.use(notFound)
app.use(errorHandlerMiddleware)

//if port is set dynamically, use process, otherwise use port 3000
const port = process.env.PORT || 3000

//first connect to the database before starting the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}....`))
  } catch (err) {
    console.log(err)
  }
}

start()
