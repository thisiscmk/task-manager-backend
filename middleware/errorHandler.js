const { CustomAPIError } = require("../errors/custom-error")

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ errMsg: err.message })
  }
  return res.status(500).json({ errMsg: "Something went wrong, please try again" })
}

module.exports = errorHandlerMiddleware
