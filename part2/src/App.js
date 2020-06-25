import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '123456789' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange =(ev)=>{
    setNewName(ev.target.value)
  }

  const handleNumberChange=(ev)=>{
    if(ev.target.value.length >0){
      setNewNumber(ev.target.value)
    }
  }

  const saveName =(ev)=>{
      ev.preventDefault();
      let newObj = {name: newName, number: newNumber}
      let objs = persons.filter(person => person.name === newName || person.number === newNumber)
      console.log(objs)
      if (objs.length > 0){
        alert(`${newName} already exists.`)  
      }
      else{
        setPersons(persons.concat(newObj))
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={saveName}>
        <div>
          Name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <br/>
        <div>
          Number: <input onChange={handleNumberChange} value={newNumber} type="number"/>
        </div>
        <br/>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers = {persons}/>
    </div>
  )
}

export default App