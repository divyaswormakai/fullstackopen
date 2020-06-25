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

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content contents ={course.parts}/>
    </>
  )
}

export default Course