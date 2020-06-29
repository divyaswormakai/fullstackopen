exports.unknownEndPont = (req,res) => {
  res.status(404).send({ error:'unknown endpoint' })
}
exports.errorHandler = (error, request, response, next) => {
  console.log('ERROR')
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name==='ValidationError'){
    return response.status(400).json({ error:error.message })
  }
  else{
    return response.status(400).json({ error:error.message })
  }

  // eslint-disable-next-line no-unreachable
  next(error)
}
