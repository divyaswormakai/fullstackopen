import React, { useState } from 'react'
import Numbers from './components/Numbers'
import Phonebook from './components/PhoneBook'
import AddForm from './components/AddForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '123456789' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [personToShow, setPersonToShow] = useState(persons)

  const filterNames =(val)=>{
    console.log("FilterN Names:",val)
    if (val.length>0 || filter !== ''){
      let objs = persons.filter(person => person.name.includes(val))
      console.log(objs)
      setPersonToShow(objs)
    }
    else{
      setPersonToShow(persons)
    }
  }

  const handleNameChange =(ev)=>{
    setNewName(ev.target.value)
  }

  const handleNumberChange=(ev)=>{
    setNewNumber(ev.target.value)
  }

  const handleFilterChange=(ev)=>{
    setFilter(ev.target.value)
      //filter using the filter value here

    filterNames(ev.target.value)
  }

  const saveName =(ev)=>{
      ev.preventDefault();
      let newObj = {name: newName, number: newNumber}
      let objs = persons.filter(person => person.name === newName || person.number === newNumber)
      if (objs.length > 0){
        alert(`${newName} already exists.`)  
      }
      else{
        const temp = persons.concat(newObj)
        setPersons(temp)
        setFilter('')
        setPersonToShow(temp)

      }
  }

  return (
    <div>
      <Phonebook saveName={saveName} handleFilterChange={handleFilterChange} filter={filter}/>
      <AddForm saveName= {saveName} handleNameChange= {handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      <Numbers numbers = {personToShow}/>
    </div>
  )
}

export default App