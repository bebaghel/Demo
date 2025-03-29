
const asyncHandler = (requestHandler) => {
   return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}


export { asyncHandler }

// const asyncHandler = () => {}
// const asyncHandler = (function) => () => {}
// const asyncHandler = (function) => async () => {}


// this is raper function
// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//         console.log("Error", error)
//     }
// }





