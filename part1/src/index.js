import React from 'react'
import ReactDOM from 'react-dom'

const Header =(props)=>{
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props)=>{
  console.log(props.part)
  return(
    <>
    <p>{props.part.name}: {props.part.exercises}</p>
    </>
  )
}

const Content=(props)=>{
  return(
    <>
      <Part part={props.part[0]}/>
      <Part part={props.part[1]}/>
      <Part part={props.part[2]}/>
    </>
  )
}

const Total =(props)=>{
  let total =0
  props.part.forEach(element=>{
    total+=element.exercises
  })
  return(
    <p>Number of exercises {total}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part = [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
   {
    name: 'State of a component',
    exercises: 14
  }]

  const getTotalExercises=()=>{
    
  }
  return (
    <div>
      <Header course= {course}/>
      <Content part={part}/>

      <Total part = {part}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))