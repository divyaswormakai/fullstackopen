const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose  = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const Contact = require('./models/contacts.model')
const { response } = require('express')

//middleware
morgan.token('body', function getBody(req){
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time - :body'))
//database connection
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res)=> console.log("Connected to Database!!!"))
  .catch((err)=>console.log("Could not connect to Database:\n"+err))


  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    console.log("Finding people")
    Contact.find({})
    .then(result=>{
        console.log("Phonebook:")
        result.forEach(elem=>{
            console.log(`${elem.name}: ${elem.number}`)
        })
        res.json(result)
    })
  })

  app.get('/api/info',(req,res)=>{
    const personInfo =`Persons has info for ${persons.length} people.`
    const date = new Date()

    res.send(`<div><p>${personInfo}</p><p>${date}</p></div>`)
  })

  app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    Contact.findById(id).then(contact=>{
      if(contact.length===0){
        res.status(200).send({msg:'No contact found'})
      }
      else{
        res.json(contact)
      }
    })
  })

  app.delete('/api/persons/:id',(req,res)=>{
      const id = req.params.id
      Contact.findByIdAndDelete(id).then(result=>{
        res.status(204).end()
      })
  })

  app.post('/api/persons', (req,res)=>{
      const body = req.body
      console.log(body)

      if(body.name ===undefined){
        return response.status(400).json({error:'Name missing '})
      }
      if(body.name === '' || body.number===''){
        res.status(501).send({
            error:'Please fill the details of number and name'
        })
      }
      else{
        const newContact = new Contact({name:body.name,number:body.number})
        newContact.save().then(savedNumber => res.json(savedNumber))
      }
  })
    
  const unknownEndPont = (req,res)=>{
      res.status(404).send({error:'unknown endpoint'})
  }

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


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