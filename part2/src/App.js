import React, { useState,useEffect } from 'react'
import Numbers from './components/Numbers'
import Phonebook from './components/PhoneBook'
import AddForm from './components/AddForm'

import PhoneService from './services/PhoneServices'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [personToShow, setPersonToShow] = useState([])

  useEffect(()=>{
    SetData()
  },[])

  const SetData=()=>{
    PhoneService.getAll()
      .then(data=>{
        setPersons(data)
        setPersonToShow(data)
      })
  }

  const filterNames =(val)=>{
    console.log("FilterN Names:",val)
    if (val.length>0 || filter !== ''){
      let objs = persons.filter(person => person.name.includes(val))
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

  const deleteNumber=(obj)=>{
    if(window.confirm(`Delete ${obj.name}?`)){
      PhoneService.deleteNumber(obj).then((res)=>{
        SetData()
      })
    }
    
  }

  const saveName =(ev)=>{
      ev.preventDefault();
      let newObj = {name: newName, number: newNumber}
      let objs = persons.filter(person => person.name === newName || person.number === newNumber)
      if (objs.length > 0){
        newObj = {id: objs[0].id, name: newName, number: newNumber}
        PhoneService.updateNumber(newObj).then(res=>{
          SetData()
        })
      }
      else{
        PhoneService.createNumber(newObj).then(res=>{
          SetData()
        })

      }
  }

  return (
    <div>
      <Phonebook saveName={saveName} handleFilterChange={handleFilterChange} filter={filter}/>
      <AddForm saveName= {saveName} handleNameChange= {handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      {personToShow.length>0?(
       <Numbers numbers = {personToShow} deleteNumber={deleteNumber}/>
      ):null}
    </div>
  )
}

export default App