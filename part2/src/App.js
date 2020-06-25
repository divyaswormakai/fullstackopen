import React from 'react'
import Course from './components/Course'

const HeaderHome = ({ header }) => {
    return (
      <h2>{header}</h2>
    )
  }

const Courses = ({courses})=>{
    return courses.map((course,indx)=>{
        return(
            <div key={"course"+indx}>
                <Course course={course}/>
            </div>
        )
    })
}
const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
    
    return(
        <>
            <HeaderHome header={"Web Development Curriculum"} />
            <Courses courses={courses}/>
        </>
    )
}


export default App