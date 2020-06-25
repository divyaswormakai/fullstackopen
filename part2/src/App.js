import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange =(ev)=>{
      setNewName(ev.target.value)
  }

  const saveName =(ev)=>{
      ev.preventDefault();
      let newObj = {name: newName}
      let objs = persons.filter(person => person.name === newName)
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
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers = {persons}/>
    </div>
  )
}

export default App