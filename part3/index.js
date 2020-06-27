const express = require('express')

const app = express()
app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/info',(req,res)=>{
    const personInfo =`Persons has info for ${persons.length} people.`
    const date = new Date()

    res.send(`<div><p>${personInfo}</p><p>${date}</p></div>`)
  })

  app.get('/api/persons/:id',(req,res)=>{
      const id = req.params.id
      
    let personList = persons.find(person => person.id==id)
      if(personList){
          res.json(personList)
      }
      else{
          res.status(404).end()
      }
  })

  app.delete('/api/persons/:id',(req,res)=>{
      const id = req.params.id
      console.log(id)
      let newPersons = persons.filter((person=>person.id!=id))
      console.log("New List:",newPersons)
      persons = newPersons
      res.status(204).end()
  })

  app.post('/api/persons', (req,res)=>{
      const body = req.body
      let objs = persons.filter(person=>person.name===body.name || person.number === body.number)
      if(body.name === '' || body.number===''){
        res.status(501).send({
            error:'Please fill the details of number and name'
        })
      }
      else if(objs.length>0){
        res.status(501).send({
            error:'The name/number already exists'
        })
      }
      else{
        const id = Math.floor(Math.random()*100000)
        body.id = id
        persons = persons.concat(body)
        res.status(204).end()
      }
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })