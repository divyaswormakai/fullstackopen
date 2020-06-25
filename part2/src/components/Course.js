import React from 'react'
import Part from './Part'

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Content = ({contents})=>{
  return contents.map((elem,indx)=>{
   return <Part part= {elem} key={indx}/> 
  })
}

const Accumulative=({contents})=>{
  let final =0
  contents.map((content)=>final+=content.exercises)
  return(
    <p><b>total of {final} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content contents ={course.parts}/>
      <Accumulative contents={course.parts}/>
    </>
  )
}

export default Course