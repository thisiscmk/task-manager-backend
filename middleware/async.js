//template for async operations to avoid redundant code
const asyncWrapper = controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (err) {
      //look for the error message in another middleware
      next(err)
    }
  }
}

module.exports = asyncWrapper
