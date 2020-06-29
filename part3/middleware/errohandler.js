exports.unknownEndPont = (req,res)=>{
    res.status(404).send({error:'unknown endpoint'})
}
exports.errorHandler = (error, request, response, next) => {
  console.log("ERROR")
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
