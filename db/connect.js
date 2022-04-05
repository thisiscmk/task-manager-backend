//import mongoose for database connections and queries
const mongoose = require("mongoose")

//open mongoose's connection to MongoDB
const connectDB = url => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
}

module.exports = connectDB
